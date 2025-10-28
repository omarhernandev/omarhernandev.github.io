import { withCORS } from '../util/cors.js';
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    res.setHeader('X-Debug', 'MethodNotAllowed');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
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
        success: false,
        message: 'Please check your input and try again.',
        errors: fields 
      });
    }

    // Send email using Resend
    try {
      await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>',
        to: process.env.TO_EMAIL,
        replyTo: email,
        subject: `New Contact Form Submission from ${name || email}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name || 'N/A'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      });

      console.log('Email sent successfully');

      res.setHeader('X-Debug', 'OK');
      return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      res.setHeader('X-Debug', 'EmailError');
      return res.status(200).json({ success: true, message: 'Message received successfully!' });
    }

  } catch (error) {
    console.error('Contact error:', error);
    res.setHeader('X-Debug', 'ServerError');
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send message. Please try again.'
    });
  }
}

export default withCORS(handler);
