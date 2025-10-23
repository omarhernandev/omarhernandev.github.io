import { Resend } from 'resend';

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting storage - in-memory Map
// Key: IP address, Value: Array of submission timestamps
const rateLimitMap = new Map();

// Clean up old rate limit entries (older than 1 hour)
function cleanupRateLimit() {
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const recentTimestamps = timestamps.filter(timestamp => timestamp > oneHourAgo);
    
    if (recentTimestamps.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recentTimestamps);
    }
  }
}

// Check rate limit for IP address
function checkRateLimit(ip) {
  cleanupRateLimit();
  
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  
  // Allow maximum 3 submissions per hour
  if (timestamps.length >= 3) {
    return false;
  }
  
  // Add current timestamp
  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  
  return true;
}

// Sanitize input to prevent XSS attacks
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Server-side validation
function validateFormData(data) {
  const errors = {};
  
  // Validate name
  if (!data.name || typeof data.name !== 'string') {
    errors.name = 'Name is required';
  } else {
    const name = data.name.trim();
    if (name.length < 2 || name.length > 100) {
      errors.name = 'Name must be between 2 and 100 characters';
    }
  }
  
  // Validate email
  if (!data.email || typeof data.email !== 'string') {
    errors.email = 'Email is required';
  } else {
    const email = data.email.trim();
    if (!isValidEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }
  }
  
  // Validate message
  if (!data.message || typeof data.message !== 'string') {
    errors.message = 'Message is required';
  } else {
    const message = data.message.trim();
    if (message.length < 10 || message.length > 1000) {
      errors.message = 'Message must be between 10 and 1000 characters';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    // Get client IP address for rate limiting
    const clientIP = req.headers['x-forwarded-for'] || 
                     req.headers['x-real-ip'] || 
                     req.connection?.remoteAddress || 
                     req.socket?.remoteAddress ||
                     'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
    }

    // Parse JSON request body
    const body = req.body;

    // Honeypot validation - reject if website field has any value
    if (body.website && body.website.trim() !== '') {
      console.error('Honeypot triggered for IP:', clientIP);
      return res.status(400).json({
        success: false,
        message: 'Invalid submission'
      });
    }

    // Server-side validation
    const validation = validateFormData(body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Please check your input',
        errors: validation.errors
      });
    }

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      message: sanitizeInput(body.message)
    };

    // Send email using Resend
    try {
      const emailData = await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>',
        to: process.env.TO_EMAIL,
        replyTo: sanitizedData.email,
        subject: `New Contact Form Submission from ${sanitizedData.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${sanitizedData.message}</p>
        `
      });

      console.log('Email sent successfully:', emailData.id);

      return res.status(200).json({
        success: true,
        message: 'Message sent successfully!'
      });

    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again.'
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again.'
    });
  }
}
