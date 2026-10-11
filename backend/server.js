const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const supabase = require('./supabase');

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_request, file, callback) => {
    callback(null, file.mimetype === 'image/webp');
  },
});

app.use(cors());
app.use(express.json());

app.get('/api/health', async (_request, response) => {
  const { error } = await supabase.storage.getBucket('member-photos');
  if (error) {
    return response.status(503).json({ ok: false, error: `Storage unavailable: ${error.message}` });
  }
  return response.json({ ok: true, storage: 'member-photos' });
});

app.get('/api/members', async (_request, response) => {
  const { data, error } = await supabase
    .from('members')
    .select('id, name, domain, position, srn, email, linkedin_url, github_url, branch, semester, bio, photo_url, status, created_at')
    .order('created_at', { ascending: false });

  if (error) return response.status(502).json({ error: `Unable to fetch members: ${error.message}` });
  return response.json({ members: data });
});

app.get('/api/team-members', async (_request, response) => {
  const { data, error } = await supabase
    .from('members')
    .select('id, name, domain, position, srn, linkedin_url, github_url, branch, semester, bio, photo_url')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) return response.status(502).json({ error: `Unable to fetch team members: ${error.message}` });
  return response.json({ members: data });
});

app.patch('/api/members/:id/status', async (request, response) => {
  const { status } = request.body;
  if (!['approved', 'rejected'].includes(status)) {
    return response.status(400).json({ error: 'Status must be approved or rejected.' });
  }

  const { data: currentMember, error: currentMemberError } = await supabase
    .from('members')
    .select('status')
    .eq('id', request.params.id)
    .single();

  if (currentMemberError) return response.status(404).json({ error: 'Member not found.' });
  if (['approved', 'rejected'].includes(currentMember.status)) {
    return response.status(409).json({ error: 'Approved or rejected members are locked and cannot be changed.' });
  }

  const { data, error } = await supabase
    .from('members')
    .update({ status })
    .eq('id', request.params.id)
    .select()
    .single();

  if (error) return response.status(502).json({ error: `Unable to update member: ${error.message}` });
  return response.json({ member: data });
});

app.delete('/api/members/:id', async (request, response) => {
  const { data: member, error: memberError } = await supabase
    .from('members')
    .select('photo_url, status')
    .eq('id', request.params.id)
    .single();

  if (memberError) return response.status(404).json({ error: 'Member not found.' });
  if (['approved', 'rejected'].includes(member.status)) {
    return response.status(409).json({ error: 'Approved or rejected members are locked and cannot be deleted.' });
  }

  const { error: deleteError } = await supabase.from('members').delete().eq('id', request.params.id);
  if (deleteError) return response.status(502).json({ error: `Unable to delete member: ${deleteError.message}` });

  try {
    const imagePath = decodeURIComponent(new URL(member.photo_url).pathname.split('/member-photos/')[1] || '');
    if (imagePath) await supabase.storage.from('member-photos').remove([imagePath]);
  } catch (_error) {
    // The profile record is deleted even if its public image URL cannot be parsed.
  }

  return response.status(204).send();
});

app.post('/api/members', upload.single('photo'), async (request, response) => {
  const requiredFields = ['name', 'domain', 'position', 'srn', 'email', 'branch', 'semester'];
  const missingField = requiredFields.find((field) => !request.body[field]?.trim());

  if (missingField || !request.file) {
    return response.status(400).json({ error: missingField ? `${missingField} is required.` : 'A WebP profile image is required.' });
  }

  const semester = Number(request.body.semester);
  if (!Number.isInteger(semester) || semester < 1 || semester > 8) {
    return response.status(400).json({ error: 'Semester must be a number between 1 and 8.' });
  }

  const safeSrn = request.body.srn.replace(/[^a-zA-Z0-9_-]/g, '-');
  const imagePath = `${safeSrn}/${crypto.randomUUID()}.webp`;
  const { error: uploadError } = await supabase.storage
    .from('member-photos')
    .upload(imagePath, request.file.buffer, { contentType: 'image/webp', upsert: false });

  if (uploadError) {
    return response.status(502).json({ error: `Unable to upload profile image: ${uploadError.message}` });
  }

  const { data: publicUrlData } = supabase.storage.from('member-photos').getPublicUrl(imagePath);
  const { data: member, error: insertError } = await supabase
    .from('members')
    .insert({
      name: request.body.name.trim(),
      domain: request.body.domain.trim(),
      position: request.body.position.trim(),
      srn: request.body.srn.trim(),
      email: request.body.email.trim(),
      linkedin_url: request.body.linkedin_url?.trim() || null,
      github_url: request.body.github_url?.trim() || null,
      branch: request.body.branch.trim(),
      semester,
      bio: request.body.bio?.trim() || null,
      photo_url: publicUrlData.publicUrl,
      status: 'pending',
    })
    .select()
    .single();

  if (insertError) {
    await supabase.storage.from('member-photos').remove([imagePath]);
    return response.status(502).json({ error: `Unable to save member profile: ${insertError.message}` });
  }

  return response.status(201).json({ member });
});

app.use((error, _request, response, _next) => {
  if (error instanceof multer.MulterError) {
    return response.status(400).json({ error: error.code === 'LIMIT_FILE_SIZE' ? 'Profile image must be 5 MB or smaller.' : error.message });
  }
  return response.status(400).json({ error: error.message || 'Invalid request.' });
});

app.listen(port, () => {
  console.log(`Member API listening at http://localhost:${port}`);
});
