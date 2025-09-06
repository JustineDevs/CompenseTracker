/**
 * Anonymous User Management
 * 
 * This utility manages anonymous user IDs for visitors who haven't signed up.
 * Each visitor gets a unique ID stored in localStorage that persists across sessions.
 * This allows tracking individual user calculations without requiring authentication.
 */

const ANONYMOUS_USER_KEY = 'compense_guest_id';

/**
 * Get or create an anonymous user ID for the current visitor
 * @returns {string} The anonymous user ID
 */
export function getOrCreateAnonymousId(): string {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'server-side';
  }

  let anonId = localStorage.getItem(ANONYMOUS_USER_KEY);
  
  if (!anonId) {
    // Generate a new anonymous ID using crypto.randomUUID() for modern browsers
    // Fallback to a custom UUID generator for older browsers
    try {
      anonId = crypto.randomUUID();
    } catch (error) {
      // Fallback for browsers that don't support crypto.randomUUID()
      anonId = generateFallbackUUID();
    }
    
    // Store the ID in localStorage for persistence
    localStorage.setItem(ANONYMOUS_USER_KEY, anonId);
    
    // Track that a new anonymous user was created
    console.log('Created new anonymous user:', anonId);
  }
  
  return anonId;
}

/**
 * Get the current anonymous user ID without creating a new one
 * @returns {string | null} The anonymous user ID or null if none exists
 */
export function getAnonymousId(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  
  return localStorage.getItem(ANONYMOUS_USER_KEY);
}

/**
 * Clear the anonymous user ID (useful for testing or user request)
 */
export function clearAnonymousId(): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem(ANONYMOUS_USER_KEY);
  console.log('Cleared anonymous user ID');
}

/**
 * Check if the current user has an anonymous ID
 * @returns {boolean} True if anonymous ID exists
 */
export function hasAnonymousId(): boolean {
  return getAnonymousId() !== null;
}

/**
 * Generate a fallback UUID for browsers that don't support crypto.randomUUID()
 * @returns {string} A UUID-like string
 */
function generateFallbackUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get anonymous user info for debugging/display purposes
 * @returns {object} Anonymous user information
 */
export function getAnonymousUserInfo() {
  const anonId = getAnonymousId();
  
  return {
    id: anonId,
    exists: anonId !== null,
    isNew: !hasAnonymousId(),
    storageType: 'localStorage',
    warning: 'Clearing browser data will remove your calculation history'
  };
}
