/**
 * Netlify Function — Formulário de contato
 *
 * Variáveis de ambiente necessárias (configure em Netlify > Site settings > Environment variables):
 *   SMTP_HOST     ex: smtp.gmail.com
 *   SMTP_PORT     ex: 587
 *   SMTP_USER     ex: seuemail@gmail.com
 *   SMTP_PASS     sua senha de app (Gmail: https://myaccount.google.com/apppasswords)
 *   CONTACT_EMAIL destinatário dos contatos (padrão: comercial@archedesenvolvimento.com.br)
 */

const nodemailer = require('nodemailer');

const HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
};

exports.handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers: HEADERS, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: HEADERS,
            body: JSON.stringify({ error: 'Método não permitido.' }),
        };
    }

    let body;
    try {
        body = JSON.parse(event.body);
    } catch {
        return {
            statusCode: 400,
            headers: HEADERS,
            body: JSON.stringify({ error: 'JSON inválido.' }),
        };
    }

    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
        return {
            statusCode: 400,
            headers: HEADERS,
            body: JSON.stringify({ error: 'Preencha nome, e-mail e mensagem.' }),
        };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            statusCode: 400,
            headers: HEADERS,
            body: JSON.stringify({ error: 'E-mail inválido.' }),
        };
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_PORT === '465',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const destination = process.env.CONTACT_EMAIL || 'renatanolasco78@gmail.com';

        await transporter.sendMail({
            from: `"Site Arche" <${process.env.SMTP_USER}>`,
            to: destination,
            replyTo: `"${name}" <${email}>`,
            subject: subject ? `[Site] ${subject}` : `[Site] Contato de ${name}`,
            html: `
                <div style="font-family:Inter,sans-serif;max-width:560px;margin:0 auto;color:#374151">
                    <div style="background:#1a1a2e;padding:24px 32px;border-radius:4px 4px 0 0">
                        <h2 style="margin:0;color:#1a9e8e;font-size:1.1rem;letter-spacing:1px;text-transform:uppercase">
                            Nova mensagem — Arche
                        </h2>
                    </div>
                    <div style="border:1px solid #e5e7eb;border-top:none;padding:32px;border-radius:0 0 4px 4px">
                        <table style="width:100%;border-collapse:collapse">
                            <tr>
                                <td style="padding:8px 0;font-size:0.78rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#6b7280;width:90px">Nome</td>
                                <td style="padding:8px 0;font-size:0.95rem;color:#1a1a2e">${escapeHtml(name)}</td>
                            </tr>
                            <tr>
                                <td style="padding:8px 0;font-size:0.78rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#6b7280">E-mail</td>
                                <td style="padding:8px 0;font-size:0.95rem"><a href="mailto:${escapeHtml(email)}" style="color:#1a9e8e">${escapeHtml(email)}</a></td>
                            </tr>
                            ${subject ? `
                            <tr>
                                <td style="padding:8px 0;font-size:0.78rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#6b7280">Assunto</td>
                                <td style="padding:8px 0;font-size:0.95rem;color:#1a1a2e">${escapeHtml(subject)}</td>
                            </tr>` : ''}
                        </table>
                        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0">
                        <p style="font-size:0.78rem;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#6b7280;margin-bottom:12px">Mensagem</p>
                        <p style="font-size:0.95rem;line-height:1.7;white-space:pre-wrap">${escapeHtml(message)}</p>
                    </div>
                </div>
            `,
        });

        return {
            statusCode: 200,
            headers: HEADERS,
            body: JSON.stringify({ message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' }),
        };
    } catch (err) {
        console.error('[contact] Erro ao enviar e-mail:', err.message);
        return {
            statusCode: 500,
            headers: HEADERS,
            body: JSON.stringify({ error: 'Erro ao enviar mensagem. Tente novamente ou entre em contato por telefone.' }),
        };
    }
};

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
