export function peekLastItemInCollection<T>(collection: readonly T[]): T {
  if (collection.length === 0) {
    throw new Error("Collection is empty.");
  }

  return collection[collection.length - 1]!;
}
