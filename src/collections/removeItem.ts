export function removeItem<T>(collection: readonly T[], item: T): readonly T[] {
  const itemIndex = collection.indexOf(item);

  if (itemIndex === -1) {
    throw new Error(`Item does not exist in collection.`);
  }

  return collection.filter((_, i) => i !== itemIndex);
}
