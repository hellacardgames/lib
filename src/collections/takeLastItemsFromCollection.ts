type TakeLastItemsFromCollectionResult<T> = {
  readonly collection: readonly T[];
  readonly items: T[];
};

export function takeLastItemsFromCollection<T>(
  collection: readonly T[],
  count: number,
): TakeLastItemsFromCollectionResult<T> {
  if (count < 1) {
    throw new Error("Count must be a positive number.");
  }
  if (collection.length < count) {
    throw new Error("Collection does not have enough items.");
  }

  return {
    collection: collection.slice(0, collection.length - count),
    items: collection.slice(collection.length - count),
  };
}
