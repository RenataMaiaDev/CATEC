const { enviarEmail, isValidEmail, paraAnexoNodemailer, escapeHtml } = require('./_lib/mailer');
const LOGO_SISAMB_BASE64 = require('./logo-sisamb-base64');

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
        <div style="background-color: #ffffff; padding: 20px 24px; border-bottom: 3px solid #00c29d;">
          <img
            src="cid:sisamb-logo"
            alt="SISAMB"
            width="140"
            height="47"
            style="display: block; width: 140px; height: 47px; margin: 0 0 8px;"
          />
          <p style="margin: 0; font-size: 13px; color: #64748b;">Novo agendamento recebido pelo site</p>
        </div>

        <div style="padding: 24px; background-color: #ffffff;">
          <p style="margin: 0 0 16px; font-size: 14px; color: #333333;">
            Novo agendamento recebido pelo site, enviado por <strong>${escapeHtml(name)}</strong>.
          </p>

          <div style="background-color: rgba(0, 194, 157, 0.08); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
            <div style="font-weight: 700; font-size: 15px; color: #2a2f35; margin-bottom: 4px;">${escapeHtml(name)}</div>
            ${document ? `<div style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Documento: ${escapeHtml(document)}</div>` : ''}

            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              ${
                address
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #2a2f35;"><strong>Endereço:</strong> ${escapeHtml(address)}</td>
              </tr>`
                  : ''
              }
              <tr>
                <td style="padding: 6px 0; color: #2a2f35;"><strong>E-mail:</strong> ${escapeHtml(email)}</td>
              </tr>
              ${
                phone
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #2a2f35;"><strong>Telefone:</strong> ${escapeHtml(phone)}</td>
              </tr>`
                  : ''
              }
              ${
                preferredDate
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #2a2f35;"><strong>Data agendada:</strong> ${escapeHtml(preferredDate)}</td>
              </tr>`
                  : ''
              }
              ${
                preferredTime
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #2a2f35;"><strong>Hora agendada:</strong> ${escapeHtml(preferredTime)}</td>
              </tr>`
                  : ''
              }
            </table>
          </div>

          <div>
            <p style="margin: 0 0 8px; font-size: 14px; font-weight: 700; color: #2a2f35;">Descrição</p>
            <div style="background-color: rgba(0, 194, 157, 0.08); border-left: 3px solid #00795f; padding: 12px 16px; font-size: 14px; color: #333333; border-radius: 0 6px 6px 0;">
              ${escapeHtml(description)}
            </div>
          </div>
        </div>
      </div>
    `;

    await enviarEmail({
      from: `"Formulário SISAMB" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_TO_SISAMB || process.env.MAIL_TO || process.env.GMAIL_USER,
      replyTo: email,
      subject: `Novo agendamento SISAMB - ${name}`,
      text: linhas.map(([campo, valor]) => `${campo}: ${valor}`).join('\n'),
      html,
      attachments: [
        {
          filename: 'sisamb-logo.png',
          content: LOGO_SISAMB_BASE64,
          encoding: 'base64',
          contentType: 'image/png',
          cid: 'sisamb-logo',
          contentDisposition: 'inline',
        },
        ...attachments,
      ],
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar email do SISAMB:', error);
    return res.status(500).json({ error: 'Falha ao enviar email' });
  }
};
