import { withCORS } from '../util/cors.js';
// import { Resend } from 'resend';
// const resend = new Resend(process.env.RESEND_API_KEY);

async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('X-Debug', 'MethodNotAllowed');
    return res.status(405).json({ ok: false, code: 'METHOD_NOT_ALLOWED' });
  }

  try {
    const { name, email, message } = req.body;
    const fields = {};

    // Validate email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      fields.email = 'Valid email required';
    }

    // Validate message
    if (!message || typeof message !== 'string' || message.length < 2) {
      fields.message = 'Message must be at least 2 characters';
    }

    // Validate optional name
    if (name && (typeof name !== 'string' || name.length > 100)) {
      fields.name = 'Name must be 100 characters or less';
    }

    // Return validation errors if any
    if (Object.keys(fields).length > 0) {
      res.setHeader('X-Debug', 'ValidationError');
      return res.status(400).json({ 
        ok: false, 
        code: 'VALIDATION_ERROR',
        fields 
      });
    }

    // Mailer stub - uncomment when ready to send emails
    // await resend.emails.send({
    //   from: 'Contact Form <onboarding@resend.dev>',
    //   to: process.env.TO_EMAIL,
    //   replyTo: email,
    //   subject: `Contact from ${name || email}`,
    //   html: `<p><strong>From:</strong> ${name || 'N/A'}</p>
    //          <p><strong>Email:</strong> ${email}</p>
    //          <p><strong>Message:</strong></p>
    //          <p>${message}</p>`
    // });

    res.setHeader('X-Debug', 'OK');
    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error('Contact error:', error);
    res.setHeader('X-Debug', 'ServerError');
    return res.status(500).json({ 
      ok: false, 
      code: 'SERVER_ERROR'
    });
  }
}

export default withCORS(handler);
