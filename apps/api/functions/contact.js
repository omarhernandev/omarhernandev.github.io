import { Resend } from 'resend';
import { corsWrapper } from '../util/cors.js';

const resend = new Resend(process.env.RESEND_API_KEY);

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('X-Debug', 'MethodNotAllowed');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, message, website } = req.body;

    // Honeypot check
    if (website?.trim()) {
      res.setHeader('X-Debug', 'HoneypotTriggered');
      return res.status(400).json({ success: false, message: 'Invalid submission' });
    }

    // Basic validation
    if (!name || !email || !message) {
      res.setHeader('X-Debug', 'ValidationError');
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (name.length < 2 || name.length > 100) {
      res.setHeader('X-Debug', 'ValidationError');
      return res.status(400).json({ success: false, message: 'Name must be 2-100 characters' });
    }

    if (message.length < 10 || message.length > 1000) {
      res.setHeader('X-Debug', 'ValidationError');
      return res.status(400).json({ success: false, message: 'Message must be 10-1000 characters' });
    }

    // Send email
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `New Contact: ${name}`,
      html: `<h2>Contact Form</h2><p><strong>From:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`
    });

    res.setHeader('X-Debug', 'OK');
    return res.status(200).json({ success: true, message: 'Message sent!' });

  } catch (error) {
    console.error('Contact error:', error);
    res.setHeader('X-Debug', 'ServerError');
    return res.status(500).json({ success: false, message: 'Failed to send message' });
  }
}

export default corsWrapper(handler);
