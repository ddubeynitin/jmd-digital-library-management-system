const crypto = require('crypto');
const env = require('./env');

const hasCloudinaryConfig = () =>
  Boolean(env.CLOUD_NAME && env.CLOUD_API_KEY && env.CLOUD_API_SECRET);

const getCloudinaryUploadUrl = () =>
  `https://api.cloudinary.com/v1_1/${env.CLOUD_NAME}/image/upload`;

const buildCloudinarySignature = (params) => {
  const filtered = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return crypto
    .createHash('sha1')
    .update(`${filtered}${env.CLOUD_API_SECRET}`)
    .digest('hex');
};

const uploadToCloudinary = async (fileData, options = {}) => {
  if (!hasCloudinaryConfig()) {
    throw new Error('Cloudinary configuration is missing');
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const formData = new URLSearchParams();
  const signature = buildCloudinarySignature({
    timestamp,
    folder: options.folder,
  });

  formData.set('file', fileData);
  formData.set('api_key', env.CLOUD_API_KEY);
  formData.set('timestamp', timestamp);
  formData.set('signature', signature);

  if (options.folder) {
    formData.set('folder', options.folder);
  }

  const response = await fetch(getCloudinaryUploadUrl(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  const responseText = await response.text();
  let responseBody = null;

  if (responseText) {
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      responseBody = responseText;
    }
  }

  if (!response.ok) {
    const error = new Error(
      responseBody?.error?.message || responseBody?.message || 'Cloudinary upload failed',
    );
    error.statusCode = response.status;
    error.code = responseBody?.error?.code || 'CLOUDINARY_UPLOAD_FAILED';
    error.body = responseBody;
    throw error;
  }

  return responseBody;
};

module.exports = {
  hasCloudinaryConfig,
  uploadToCloudinary,
};
