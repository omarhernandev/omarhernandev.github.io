/**
 * Resolves the API base URL based on environment
 * - Respects VITE_API_URL if set
 * - Uses Vercel production URL for GitHub Pages
 * - Falls back to localhost for dev
 */
export function getApiBase(): string {
  // 1. Check for explicit override
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  
  // 2. Detect GitHub Pages deployment
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    return 'https://omarhernandez-github-io.vercel.app';
  }
  
  // 3. Default to localhost for dev
  return 'http://localhost:3000';
}
