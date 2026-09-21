export function isCollectionLengthOdd<T>(collection: readonly T[]): boolean {
  return collection.length % 2 === 1;
}
