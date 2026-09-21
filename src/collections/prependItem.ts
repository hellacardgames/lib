export function prependItem<T>(
  collection: readonly T[],
  item: T,
): readonly T[] {
  return [item, ...collection];
}
