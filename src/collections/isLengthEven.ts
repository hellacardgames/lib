export function isLengthEven<T>(collection: readonly T[]): boolean {
  return collection.length % 2 === 0;
}
