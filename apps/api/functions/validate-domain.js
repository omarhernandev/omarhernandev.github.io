import { corsWrapper } from '../util/cors.js';

// Simple allowlist of common valid domains
const VALID_DOMAINS = new Set([
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com',
  'protonmail.com', 'aol.com', 'zoho.com', 'mail.com', 'gmx.com'
]);

// Known disposable domains
const DISPOSABLE = new Set([
  '10minutemail.com', 'guerrillamail.com', 'mailinator.com', 'tempmail.org',
  'throwaway.email', 'temp-mail.org', 'maildrop.cc', 'yopmail.com'
]);

async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('X-Debug', 'MethodNotAllowed');
    return res.status(405).json({ valid: false, error: 'Method not allowed' });
  }

  const domain = req.query.domain;
  
  if (!domain) {
    res.setHeader('X-Debug', 'ValidationError');
    return res.status(400).json({ valid: false, error: 'Missing domain' });
  }

  // Check disposable
  if (DISPOSABLE.has(domain.toLowerCase())) {
    res.setHeader('X-Debug', 'DisposableDomain');
    return res.status(200).json({ valid: false, reason: 'disposable' });
  }

  // Check allowlist
  if (VALID_DOMAINS.has(domain.toLowerCase())) {
    res.setHeader('X-Debug', 'OK');
    return res.status(200).json({ valid: true, reason: 'valid' });
  }

  // Default: allow unknown domains (graceful)
  res.setHeader('X-Debug', 'OK');
  return res.status(200).json({ valid: true, reason: 'unknown_allowed' });
}

export default corsWrapper(handler);
