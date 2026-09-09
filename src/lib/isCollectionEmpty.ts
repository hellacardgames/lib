export function isCollectionEmpty<T>(collection: readonly T[]): boolean {
  return collection.length === 0;
}
