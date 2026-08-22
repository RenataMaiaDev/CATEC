const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

async function createTransporter() {
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  const accessTokenResponse = await oauth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USER,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: accessTokenResponse?.token,
    },
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const {
    nome,
    documento,
    tipoPessoa,
    endereco,
    email,
    telefone,
    dataPreferida,
    horaPreferida,
    descricao,
  } = req.body || {};

  if (!nome || !documento || !endereco || !email || !telefone) {
    return res.status(400).json({
      error: 'Campos obrigatórios: nome, documento, endereco, email, telefone',
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  try {
    const transporter = await createTransporter();

    const linhas = [
      ['Nome', nome],
      [tipoPessoa === 'juridica' ? 'CNPJ' : 'CPF', documento],
      ['Endereço', endereco],
      ['E-mail', email],
      ['Telefone', telefone],
      ['Data preferida', dataPreferida],
      ['Horário preferido', horaPreferida],
      ['Descrição', descricao],
    ].filter(([, valor]) => valor);

    const html = `
      <h2>Nova solicitação de orçamento</h2>
      <table cellpadding="6" cellspacing="0">
        ${linhas
          .map(
            ([campo, valor]) =>
              `<tr><td><strong>${escapeHtml(campo)}</strong></td><td>${escapeHtml(valor)}</td></tr>`,
          )
          .join('')}
      </table>
    `;

    await transporter.sendMail({
      from: `"Formulário CATEC" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.GMAIL_USER,
      replyTo: email,
      subject: `Nova solicitação de orçamento - ${nome}`,
      text: linhas.map(([campo, valor]) => `${campo}: ${valor}`).join('\n'),
      html,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ error: 'Falha ao enviar email' });
  }
};
