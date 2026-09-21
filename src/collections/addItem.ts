export function addItem<T>(collection: readonly T[], item: T): readonly T[] {
  return [...collection, item];
}
