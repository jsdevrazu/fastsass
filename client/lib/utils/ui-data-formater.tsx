export function getWithFallback<T>(data: T | undefined | null, label = "data"): T | string {
  if (!data) {
    return `No ${label} found`;
  }
  return data;
}
