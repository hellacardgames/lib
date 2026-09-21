export function peekItemsAtOddIndices<T>(
  collection: readonly T[],
): readonly T[] {
  return collection.filter((_, index) => index % 2 === 1);
}
