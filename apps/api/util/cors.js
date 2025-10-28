// CORS helper for Vercel Node.js functions

const ALLOWED_ORIGINS = [
  'https://omarhernandev.github.io',
  process.env.CUSTOM_DOMAIN_ORIGIN // e.g., 'https://yourdomain.com'
].filter(Boolean);

export function corsWrapper(handler) {
  return async (req, res) => {
    const origin = req.headers.origin || req.headers.referer;
    
    // Check if origin is allowed
    const isAllowed = ALLOWED_ORIGINS.some(allowed => 
      origin?.startsWith(allowed)
    );
    
    if (isAllowed) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.setHeader('Vary', 'Origin');
    
    // Handle OPTIONS preflight
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }
    
    return handler(req, res);
  };
}
