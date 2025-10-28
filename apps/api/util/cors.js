// CORS configuration utility for Vercel serverless functions

// Allowed origin for CORS
// Can be configured via environment variable CORS_ALLOWED_ORIGINS
const ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGINS || 'https://omarhernandev.github.io';

// CORS headers to be included in all responses
export const corsHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
};

/**
 * Handle preflight OPTIONS requests
 * @param {Object} event - Vercel request event
 * @returns {Object} Response object with CORS headers
 */
export function handleOptions(event) {
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: ''
  };
}

/**
 * Add CORS headers to any response object
 * @param {Object} response - Existing response object
 * @returns {Object} Response with CORS headers added
 */
export function addCorsHeaders(response) {
  return {
    ...response,
    headers: {
      ...response.headers,
      ...corsHeaders
    }
  };
}

