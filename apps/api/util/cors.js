// CORS utility for Vercel API functions with strict origin checking

const BASE_ALLOWED_ORIGINS = [
  'https://omarhernandev.github.io'
];

// Parse additional origins from env (comma-separated)
const extraOrigins = process.env.CORS_EXTRA_ORIGINS 
  ? process.env.CORS_EXTRA_ORIGINS.split(',').map(o => o.trim())
  : [];

const ALLOWED_ORIGINS = [...BASE_ALLOWED_ORIGINS, ...extraOrigins];

/**
 * Wraps a handler with CORS support
 * @param {Function} handler - async function(req, res)
 * @returns {Function} Wrapped handler with CORS
 */
export function withCORS(handler) {
  return async function(req, res) {
    const origin = req.headers.origin || '';
    
    // Set Vary header for proper caching
    res.setHeader('Vary', 'Origin');
    
    // Check if origin is allowed
    if (ALLOWED_ORIGINS.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle OPTIONS preflight
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
    
    // Call the actual handler
    return handler(req, res);
  };
}
