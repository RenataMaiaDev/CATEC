const { enviarEmail, isValidEmail, paraAnexoNodemailer, escapeHtml } = require('./_lib/mailer');

const LOGO_CATEC_URL = 'https://catec.vercel.app/images/logo-catec-email.png';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const {
    name,
    document,
    address,
    email,
    phone,
    preferredDate,
    preferredTime,
    description,
    anexoImagem,
    anexoDocumento,
  } = req.body || {};

  if (!name || !email || !description) {
    return res.status(400).json({
      error: 'Campos obrigatórios: name, email, description',
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  let attachments;
  try {
    attachments = [paraAnexoNodemailer(anexoImagem), paraAnexoNodemailer(anexoDocumento)].filter(
      Boolean,
    );
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

  try {
    const linhas = [
      ['Nome', name],
      ['Documento', document],
      ['Endereço', address],
      ['E-mail', email],
      ['Telefone', phone],
      ['Data agendada', preferredDate],
      ['Hora agendada', preferredTime],
      ['Descrição', description],
    ].filter(([, valor]) => valor);

    const html = `
      <div style="max-width: 500px; margin: 0 auto; font-family: -apple-system, Segoe UI, Roboto, Arial, sans-serif; border: 1px solid #e2e2e2; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #131a2b; color: #ffffff; padding: 20px 24px;">
          <img
            src="${LOGO_CATEC_URL}"
            alt="CATEC Soluções"
            width="140"
            height="53"
            style="display: block; width: 140px; height: 53px; margin: 0 0 8px;"
          />
          <p style="margin: 0; font-size: 13px; color: #b9c0d0;">Nova solicitação recebida pelo site</p>
        </div>

        <div style="padding: 24px; background-color: #ffffff;">
          <p style="margin: 0 0 16px; font-size: 14px; color: #333333;">
            Nova solicitação recebida pelo site, enviada por <strong>${escapeHtml(name)}</strong>.
          </p>

          <div style="background-color: rgba(242, 101, 34, 0.06); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
            <div style="font-weight: 700; font-size: 15px; color: #131a2b; margin-bottom: 4px;">${escapeHtml(name)}</div>
            ${document ? `<div style="font-size: 12px; color: #7a8296; margin-bottom: 12px;">Documento: ${escapeHtml(document)}</div>` : ''}

            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              ${
                address
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #131a2b;"><strong>Endereço:</strong> ${escapeHtml(address)}</td>
              </tr>`
                  : ''
              }
              <tr>
                <td style="padding: 6px 0; color: #131a2b;"><strong>E-mail:</strong> ${escapeHtml(email)}</td>
              </tr>
              ${
                phone
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #131a2b;"><strong>Telefone:</strong> ${escapeHtml(phone)}</td>
              </tr>`
                  : ''
              }
              ${
                preferredDate
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #131a2b;"><strong>Data agendada:</strong> ${escapeHtml(preferredDate)}</td>
              </tr>`
                  : ''
              }
              ${
                preferredTime
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #131a2b;"><strong>Hora agendada:</strong> ${escapeHtml(preferredTime)}</td>
              </tr>`
                  : ''
              }
            </table>
          </div>

          <div>
            <p style="margin: 0 0 8px; font-size: 14px; font-weight: 700; color: #131a2b;">Descrição</p>
            <div style="background-color: rgba(242, 101, 34, 0.06); border-left: 3px solid #131a2b; padding: 12px 16px; font-size: 14px; color: #333333; border-radius: 0 6px 6px 0;">
              ${escapeHtml(description)}
            </div>
          </div>
        </div>
      </div>
    `;

    await enviarEmail({
      from: `"Formulário CATEC" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.GMAIL_USER,
      replyTo: email,
      subject: `Nova solicitação recebida pelo site - ${name}`,
      text: linhas.map(([campo, valor]) => `${campo}: ${valor}`).join('\n'),
      html,
      attachments,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return res.status(500).json({ error: 'Falha ao enviar email' });
  }
};
