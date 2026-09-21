export function isCollectionLengthEven<T>(collection: readonly T[]): boolean {
  return collection.length % 2 === 0;
}
