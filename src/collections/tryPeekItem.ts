export function tryPeekItem<T>(
  collection: readonly T[],
  index: number,
): T | undefined {
  return collection[index];
}
