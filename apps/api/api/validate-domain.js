import { withCORS } from '../util/cors.js';

const ALLOWED_DOMAINS = ['omarhernandev.github.io'];

function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('X-Debug', 'MethodNotAllowed');
    return res.status(405).json({ valid: false });
  }

  const { domain } = req.query;
  
  if (!domain) {
    res.setHeader('X-Debug', 'MissingDomain');
    return res.status(400).json({ valid: false });
  }

  const valid = ALLOWED_DOMAINS.includes(domain);
  res.setHeader('X-Debug', valid ? 'Valid' : 'Invalid');
  
  return res.status(200).json({ valid });
}

export default withCORS(handler);
