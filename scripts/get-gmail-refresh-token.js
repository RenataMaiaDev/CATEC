const { google } = require('googleapis');
const readline = require('readline');

const CLIENT_ID = process.env.GMAIL_CLIENT_ID || 'SEU_CLIENT_ID_AQUI';
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET || 'SEU_CLIENT_SECRET_AQUI';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const SCOPES = ['https://mail.google.com/'];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: SCOPES,
});

console.log('\nAbra esta URL, autorize a conta Gmail, e cole o código retornado:\n');
console.log(authUrl);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
rl.question('\nCódigo: ', async (code) => {
  try {
    const { tokens } = await oauth2Client.getToken(code.trim());
    console.log('\nRefresh Token:\n', tokens.refresh_token);
  } catch (err) {
    console.error('Erro:', err.message);
  } finally {
    rl.close();
  }
});
