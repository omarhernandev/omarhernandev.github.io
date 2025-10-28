import dns from 'dns';
import { promisify } from 'util';

// Promisify DNS functions
const resolveMx = promisify(dns.resolveMx);
const resolve4 = promisify(dns.resolve4);
const resolve6 = promisify(dns.resolve6);

// CORS headers for cross-origin requests from GitHub Pages
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://omarhernandev.github.io',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
};

// Rate limiting storage for DNS validation
const dnsRateLimitMap = new Map();

// Clean up old DNS rate limit entries (older than 1 hour)
function cleanupDnsRateLimit() {
  const oneHourAgo = Date.now() - (60 * 60 * 1000);
  
  for (const [ip, timestamps] of dnsRateLimitMap.entries()) {
    const recentTimestamps = timestamps.filter(timestamp => timestamp > oneHourAgo);
    
    if (recentTimestamps.length === 0) {
      dnsRateLimitMap.delete(ip);
    } else {
      dnsRateLimitMap.set(ip, recentTimestamps);
    }
  }
}

// Check rate limit for DNS validation requests
function checkDnsRateLimit(ip) {
  cleanupDnsRateLimit();
  
  const now = Date.now();
  const timestamps = dnsRateLimitMap.get(ip) || [];
  
  // Allow maximum 10 DNS lookups per hour per IP
  if (timestamps.length >= 10) {
    return false;
  }
  
  // Add current timestamp
  timestamps.push(now);
  dnsRateLimitMap.set(ip, timestamps);
  
  return true;
}

// Check for suspicious domain patterns
function isSuspiciousDomain(domain) {
  const suspiciousPatterns = [
    /^\d+\.\d+\.\d+\.\d+$/, // IP addresses
    /^[a-z]{1,3}\d+[a-z]{1,3}$/, // Random character patterns like abc123def
    /\.tk$|\.ml$|\.ga$|\.cf$/, // Free domains often used for spam
    /^[a-z]{1,2}\d+$/, // Very short domains with numbers
    /^[0-9]+$/, // All numeric domains
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(domain));
}

// Enhanced DNS validation with better error handling
async function checkDomainExistsEnhanced(domain) {
  try {
    // Check for suspicious domain patterns first
    if (isSuspiciousDomain(domain)) {
      return { 
        valid: false, 
        reason: 'suspicious_domain',
        details: 'Domain appears to be suspicious or potentially spam-related'
      };
    }
    
    // Set timeout for DNS operations using Promise.race
    const dnsChecks = Promise.allSettled([
      resolveMx(domain),
      resolve4(domain),
      resolve6(domain)
    ]);
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('DNS lookup timeout')), 5000);
    });
    
    // Race the DNS checks against the timeout
    let checks;
    try {
      checks = await Promise.race([dnsChecks, timeoutPromise]);
    } catch (timeoutError) {
      // If timeout occurred, all DNS lookups are considered failed
      checks = [
        { status: 'rejected', reason: timeoutError.message },
        { status: 'rejected', reason: timeoutError.message },
        { status: 'rejected', reason: timeoutError.message }
      ];
    }
    
    const results = {
      mx: checks[0].status === 'fulfilled' && checks[0].value?.length > 0,
      a: checks[1].status === 'fulfilled' && checks[1].value?.length > 0,
      aaaa: checks[2].status === 'fulfilled' && checks[2].value?.length > 0
    };
    
    const hasValidRecords = results.mx || results.a || results.aaaa;
    
    if (hasValidRecords) {
      return { 
        valid: true, 
        reason: 'valid',
        details: `Domain has valid records: ${Object.keys(results).filter(key => results[key]).join(', ')}`
      };
    } else {
      return { 
        valid: false, 
        reason: 'no_records',
        details: 'Domain does not have valid MX, A, or AAAA records'
      };
    }
    
  } catch (error) {
    // Enhanced error categorization
    let errorReason = 'dns_error';
    let errorDetails = error.message;
    
    if (error.message.includes('timeout')) {
      errorReason = 'timeout';
      errorDetails = 'DNS lookup timed out';
    } else if (error.message.includes('ENOTFOUND')) {
      errorReason = 'not_found';
      errorDetails = 'Domain not found';
    } else if (error.message.includes('ENODATA')) {
      errorReason = 'no_data';
      errorDetails = 'No DNS records found for domain';
    } else if (error.message.includes('ESERVFAIL')) {
      errorReason = 'server_fail';
      errorDetails = 'DNS server failure';
    }
    
    // Log specific DNS errors for monitoring
    console.warn(`DNS lookup failed for ${domain}:`, {
      error: error.message,
      code: error.code,
      reason: errorReason,
      timestamp: new Date().toISOString()
    });
    
    return { 
      valid: false, 
      reason: errorReason, 
      details: errorDetails,
      error: error.message 
    };
  }
}

// Backward compatibility wrapper
async function checkDomainExists(domain) {
  const result = await checkDomainExistsEnhanced(domain);
  return result.valid;
}

// Astro API route handler - handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders
  });
}

// Astro API route handler for domain validation
export async function GET({ url, request }) {
  try {
    // Get client IP address for rate limiting
    const clientIP = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limit
    if (!checkDnsRateLimit(clientIP)) {
      return new Response(JSON.stringify({
        valid: false,
        error: 'Rate limited',
        message: 'Too many domain validation requests. Please try again later.'
      }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          ...corsHeaders
        }
      });
    }

    // Get domain from query parameters
    const domain = url.searchParams.get('domain');
    
    if (!domain) {
      return new Response(JSON.stringify({
        valid: false,
        error: 'Missing domain parameter'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Basic domain format validation
    const domainRegex = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!domainRegex.test(domain)) {
      return new Response(JSON.stringify({
        valid: false,
        error: 'Invalid domain format'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // Perform enhanced DNS lookup
    const result = await checkDomainExistsEnhanced(domain);
    
    return new Response(JSON.stringify({
      valid: result.valid,
      domain: domain,
      reason: result.reason,
      details: result.details,
      timestamp: Date.now()
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
        ...corsHeaders
      }
    });

  } catch (error) {
    console.error('Domain validation error:', error);
    return new Response(JSON.stringify({
      valid: false,
      error: 'Internal server error',
      message: 'Domain validation failed. Please try again.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }
}
