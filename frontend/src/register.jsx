import { useState } from 'react';
import Card from './components/Card';
import { convertImageToWebp } from './utils/convertImageToWebp';

const initialProfile = { name: '', email: '', memberId: '', role: 'Core Member', domain: 'Web Development', department: 'CSE', semester: '5', bio: '', githubUrl: '', linkedinUrl: '' };
const inputClass = 'mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950/70 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/10';

function Field({ label, hint, children }) {
    return <label className="block text-sm font-medium text-slate-200">{label} {hint && <span className="font-normal text-slate-500">{hint}</span>}{children}</label>;
}

export function Register() {
    const [profile, setProfile] = useState(initialProfile);
    const [submitted, setSubmitted] = useState(false);
    const [convertedImage, setConvertedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageError, setImageError] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const update = ({ target: { name, value } }) => { setProfile((current) => ({ ...current, [name]: value })); setSubmitted(false); };
    const updateImage = async ({ target }) => {
        const file = target.files?.[0];
        if (!file) {
            setConvertedImage(null);
            setImageUrl(null);
            setImageError('A profile image is required.');
            return;
        }
        setIsConverting(true);
        setImageError('');
        try {
            const webpFile = await convertImageToWebp(file);
            const reader = new FileReader();
            reader.onload = () => setImageUrl(reader.result);
            reader.readAsDataURL(webpFile);
            setConvertedImage(webpFile);
        } catch (error) {
            setConvertedImage(null);
            setImageUrl(null);
            setImageError(error.message);
            target.value = '';
        } finally {
            setIsConverting(false);
        }
    };

    const submit = async (event) => {
        event.preventDefault();
        if (!convertedImage) {
            setImageError('Choose a profile image before submitting.');
            return;
        }
        setIsSubmitting(true);
        setSubmitError('');
        setSubmitted(false);

        const formData = new FormData();
        formData.append('name', profile.name);
        formData.append('email', profile.email);
        formData.append('srn', profile.memberId);
        formData.append('position', profile.role);
        formData.append('domain', profile.domain);
        formData.append('branch', profile.department);
        formData.append('semester', profile.semester);
        formData.append('bio', profile.bio);
        formData.append('github_url', profile.githubUrl);
        formData.append('linkedin_url', profile.linkedinUrl);
        formData.append('photo', convertedImage);

        try {
            const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const response = await fetch(`${apiBaseUrl}/api/members`, { method: 'POST', body: formData });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Unable to submit your profile.');
            setSubmitted(true);
        } catch (error) {
            setSubmitError(error.message || 'Unable to submit your profile.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="min-h-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-cyan-950/40 via-slate-950 to-slate-950 px-4 py-8 sm:px-6 sm:py-12">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 max-w-2xl">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Member onboarding</p>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Create your member profile</h1>
                    <p className="mt-3 text-slate-400">Add the details that will appear in the Embrione team directory.</p>
                </div>

                <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.85fr)]">
                    <form onSubmit={submit} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur sm:p-8">
                        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-6">
                            <div><h2 className="text-lg font-semibold text-white">Profile details</h2><p className="mt-1 text-sm text-slate-400">Fields marked with <span className="text-cyan-400">*</span> are required.</p></div>
                            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">Step 1 of 1</span>
                        </div>

                        <div className="mt-7 space-y-7">
                            <fieldset><legend className="text-sm font-semibold text-white">Identity</legend>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <Field label="Full name *"><input required name="name" value={profile.name} onChange={update} placeholder="e.g. Alex Rivera" className={inputClass} /></Field>
                                    <Field label="SRN *"><input required name="memberId" value={profile.memberId} onChange={update} placeholder="e.g. PES1UG23CS001" className={inputClass} /></Field>
                                </div>
                                <Field label="College email *"><input required type="email" name="email" value={profile.email} onChange={update} placeholder="you@pes.edu" className={inputClass} /></Field>
                            </fieldset>

                            <fieldset className="border-t border-slate-800 pt-7"><legend className="text-sm font-semibold text-white">Club role</legend>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <Field label="Domain"><select name="domain" value={profile.domain} onChange={update} className={inputClass}>{['Web Development', 'Design', 'Logistics', 'Operations', 'Sponsorship', 'Hospitality', 'Social Media', 'Event Management'].map((item) => <option key={item}>{item}</option>)}</select></Field>
                                    <Field label="Position"><select name="role" value={profile.role} onChange={update} className={inputClass}>{['Head', 'Vice-Head', 'Core Member', 'Member'].map((item) => <option key={item}>{item}</option>)}</select></Field>
                                    <Field label="Branch"><select name="department" value={profile.department} onChange={update} className={inputClass}>{['CSE', 'AIML', 'ECE', 'EEE', 'ME', 'Biotech'].map((item) => <option key={item}>{item}</option>)}</select></Field>
                                    <Field label="Semester"><select name="semester" value={profile.semester} onChange={update} className={inputClass}>{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => <option key={item} value={item}>Semester {item}</option>)}</select></Field>
                                </div>
                            </fieldset>

                            <fieldset className="border-t border-slate-800 pt-7"><legend className="text-sm font-semibold text-white">About you</legend>
                                <Field label="Profile image *" hint="(PNG, JPG, or JPEG)">
                                    <div className="mt-2 rounded-xl border border-dashed border-slate-700 bg-slate-950/50 p-3 transition hover:border-cyan-400/60">
                                        <input required type="file" accept="image/png,image/jpeg,.png,.jpg,.jpeg" onChange={updateImage} className="block w-full cursor-pointer text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-800 file:px-3 file:py-2 file:text-sm file:font-medium file:text-cyan-300 hover:file:bg-slate-700" />
                                        <p className="mt-2 text-xs text-slate-500">{isConverting ? 'Converting image to WebP…' : convertedImage ? `Ready for upload: ${convertedImage.name}` : 'Your image is converted to WebP in the browser before upload.'}</p>
                                    </div>
                                    {imageError && <p role="alert" className="mt-2 text-xs text-rose-400">{imageError}</p>}
                                </Field>
                                <Field label="Short bio" hint="(up to 250 characters)"><textarea name="bio" value={profile.bio} onChange={update} maxLength={250} rows={4} placeholder="Share what you enjoy building, learning, or contributing to." className={`${inputClass} resize-none`} /></Field>
                                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                                    <Field label="GitHub URL"><input type="url" name="githubUrl" value={profile.githubUrl} onChange={update} placeholder="github.com/username" className={inputClass} /></Field>
                                    <Field label="LinkedIn URL"><input type="url" name="linkedinUrl" value={profile.linkedinUrl} onChange={update} placeholder="linkedin.com/in/username" className={inputClass} /></Field>
                                </div>
                            </fieldset>
                        </div>

                        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-slate-500">You can edit these details later.</p><button disabled={isConverting || isSubmitting} type="submit" className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/30 disabled:cursor-not-allowed disabled:opacity-60">{isConverting ? 'Converting image…' : isSubmitting ? 'Submitting profile…' : 'Submit profile'}</button></div>
                        {submitted && <p role="status" className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">Profile submitted successfully and is pending review.</p>}
                        {submitError && <p role="alert" className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{submitError}</p>}
                    </form>

                    <aside className="lg:sticky lg:top-24"><div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur sm:p-6">
                        <div className="mb-5 flex items-center justify-between"><div><p className="text-sm font-semibold text-white">Live preview</p><p className="mt-1 text-xs text-slate-500">Updates as you type</p></div><span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_14px_3px_rgba(34,211,238,0.35)]" /></div>
                        <Card name={profile.name || 'Your name'} role={profile.role} department={profile.department} semester={`Semester ${profile.semester}`} domain={profile.domain} memberId={profile.memberId || 'Your SRN'} bio={profile.bio || 'Your short introduction will appear here.'} imageUrl={imageUrl} githubUrl={profile.githubUrl || null} linkedinUrl={profile.linkedinUrl || null} />
                        <p className="mt-5 text-center text-xs leading-relaxed text-slate-500">Your converted WebP image appears here before it is uploaded.</p>
                    </div></aside>
                </div>
            </div>
        </section>
    );
}
