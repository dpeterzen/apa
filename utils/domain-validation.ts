export const DOMAIN_WHITELIST = [
  // Exact domains
  'imgur.com',
  'i.imgur.com',
  'unsplash.com',
  'pbs.twimg.com',
  
  // Wildcard domains
  '*.cloudinary.com',
  '*.amazonaws.com', 
  '*.googleusercontent.com',
  
  // Complex matching patterns
  '^.*\\.cdn\\.([a-z]+)\\.com$',
  '^(upload|images)\\.wikimedia\\.org$'
];

export function isDomainAllowed(url: string): boolean {
  try {
    console.log("URL:", url);
    const parsedUrl = new URL(url);
    return DOMAIN_WHITELIST.some(pattern => {
      if (pattern === parsedUrl.hostname) return true;
      if (pattern.startsWith('*.') && parsedUrl.hostname.endsWith(pattern.slice(1))) return true;
      if (pattern.startsWith('^') && pattern.endsWith('$')) {
        const regex = new RegExp(pattern);
        return regex.test(parsedUrl.hostname);
      }
      return false;
    });
  } catch {
    return false;
  }
}