export function isValidConvexId(id: string): boolean {
  // Convex IDs are 32 characters long and contain only alphanumeric chars
  return /^[a-z0-9]{32}$/.test(id);
}