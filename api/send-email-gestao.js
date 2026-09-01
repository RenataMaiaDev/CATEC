const { enviarEmail, isValidEmail, paraAnexoNodemailer, escapeHtml } = require('./_lib/mailer');

const LOGO_GESTAO_URL = 'https://catec.vercel.app/images/logo-gestao-una.webp';

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
        <div style="background-color: #ffffff; padding: 20px 24px; border-bottom: 3px solid #00bfa5;">
          <img
            src="${LOGO_GESTAO_URL}"
            alt="Gestão Una"
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

          <div style="background-color: rgba(0, 191, 165, 0.08); border-radius: 10px; padding: 16px; margin-bottom: 16px;">
            <div style="font-weight: 700; font-size: 15px; color: #181328; margin-bottom: 4px;">${escapeHtml(name)}</div>
            ${document ? `<div style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Documento: ${escapeHtml(document)}</div>` : ''}

            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              ${
                address
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #181328;"><strong>Endereço:</strong> ${escapeHtml(address)}</td>
              </tr>`
                  : ''
              }
              <tr>
                <td style="padding: 6px 0; color: #181328;"><strong>E-mail:</strong> ${escapeHtml(email)}</td>
              </tr>
              ${
                phone
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #181328;"><strong>Telefone:</strong> ${escapeHtml(phone)}</td>
              </tr>`
                  : ''
              }
              ${
                preferredDate
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #181328;"><strong>Data agendada:</strong> ${escapeHtml(preferredDate)}</td>
              </tr>`
                  : ''
              }
              ${
                preferredTime
                  ? `
              <tr>
                <td style="padding: 6px 0; color: #181328;"><strong>Hora agendada:</strong> ${escapeHtml(preferredTime)}</td>
              </tr>`
                  : ''
              }
            </table>
          </div>

          <div>
            <p style="margin: 0 0 8px; font-size: 14px; font-weight: 700; color: #181328;">Descrição</p>
            <div style="background-color: rgba(0, 191, 165, 0.08); border-left: 3px solid #00695c; padding: 12px 16px; font-size: 14px; color: #333333; border-radius: 0 6px 6px 0;">
              ${escapeHtml(description)}
            </div>
          </div>
        </div>
      </div>
    `;

    await enviarEmail({
      from: `"Formulário Gestão Una" <${process.env.GMAIL_USER}>`,
      to: process.env.MAIL_TO_GESTAO || process.env.MAIL_TO || process.env.GMAIL_USER,
      replyTo: email,
      subject: `Novo agendamento Gestão Una - ${name}`,
      text: linhas.map(([campo, valor]) => `${campo}: ${valor}`).join('\n'),
      html,
      attachments,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar email do Gestão Una:', error);
    return res.status(500).json({ error: 'Falha ao enviar email' });
  }
};
