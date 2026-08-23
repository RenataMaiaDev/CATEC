const MailComposer = require('nodemailer/lib/mail-composer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

// Reused across warm invocations of this function instance, so a repeat
// request doesn't have to round-trip to Google's OAuth endpoint again for
// an access token that's often still valid for most of an hour.
let cachedAccessToken = null;
let cachedAccessTokenExpiry = 0;

async function getAuthClient() {
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  );

  const bufferMs = 60_000;
  if (cachedAccessToken && Date.now() < cachedAccessTokenExpiry - bufferMs) {
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
      access_token: cachedAccessToken,
      expiry_date: cachedAccessTokenExpiry,
    });
    return oauth2Client;
  }

  oauth2Client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });
  const { token } = await oauth2Client.getAccessToken();
  cachedAccessToken = token;
  cachedAccessTokenExpiry = oauth2Client.credentials.expiry_date || Date.now() + 30 * 60_000;
  return oauth2Client;
}

// Builds the raw RFC 2822 MIME message (locally, no network) and delivers it
// with a single HTTPS call to the Gmail API - avoids opening a full SMTP
// session, which tends to be slower and less reliable from serverless functions.
async function enviarEmail(mailOptions) {
  const mail = new MailComposer(mailOptions);
  const message = await mail.compile().build();
  const raw = message
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const auth = await getAuthClient();
  const gmail = google.gmail({ version: 'v1', auth });
  await gmail.users.messages.send({ userId: 'me', requestBody: { raw } });
}

const TAMANHO_MAX_ANEXO_BYTES = 3 * 1024 * 1024;

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

// Validates an { nome, tipo, base64 } attachment payload and converts it to
// the shape nodemailer expects. Returns null for an absent/empty attachment.
function paraAnexoNodemailer(anexo) {
  if (!anexo || !anexo.base64) return null;
  if (!anexo.nome || typeof anexo.base64 !== 'string') {
    throw new Error('Anexo inválido');
  }
  const bytesAproximados = Math.ceil((anexo.base64.length * 3) / 4);
  if (bytesAproximados > TAMANHO_MAX_ANEXO_BYTES) {
    throw new Error('Anexo excede o tamanho máximo permitido (3 MB)');
  }
  return {
    filename: anexo.nome,
    content: anexo.base64,
    encoding: 'base64',
    contentType: anexo.tipo || 'application/octet-stream',
  };
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = { enviarEmail, isValidEmail, paraAnexoNodemailer, escapeHtml };
