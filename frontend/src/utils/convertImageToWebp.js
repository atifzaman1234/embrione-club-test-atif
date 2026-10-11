const supportedTypes = new Set(['image/png', 'image/jpeg']);

export async function convertImageToWebp(file) {
  if (!supportedTypes.has(file.type)) {
    throw new Error('Please select a PNG, JPG, or JPEG image.');
  }

  const source = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  canvas.width = source.width;
  canvas.height = source.height;
  canvas.getContext('2d').drawImage(source, 0, 0);
  source.close();

  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob((result) => result ? resolve(result) : reject(new Error('Image conversion failed.')), 'image/webp', 0.88);
  });
  const baseName = file.name.replace(/\.[^.]+$/, '') || 'profile-image';
  return new File([blob], `${baseName}.webp`, { type: 'image/webp' });
}
