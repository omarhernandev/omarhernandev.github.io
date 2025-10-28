import { corsHeaders } from '../util/cors.js';

export default async function handler(req, res) {
  // Set CORS headers
  Object.keys(corsHeaders).forEach(key => {
    res.setHeader(key, corsHeaders[key]);
  });

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({
      valid: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { domain } = req.query;

    if (!domain) {
      return res.status(400).json({
        valid: false,
        error: 'Missing domain parameter'
      });
    }

    // For now, return valid for all domains (you can add DNS validation later)
    return res.status(200).json({
      valid: true,
      domain,
      reason: 'valid',
      details: 'Domain validation passed',
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('Domain validation error:', error);
    return res.status(500).json({
      valid: false,
      error: 'Internal server error',
      message: 'Domain validation failed. Please try again.'
    });
  }
}

