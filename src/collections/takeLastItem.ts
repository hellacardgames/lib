type TakeLastItemResult<T> = {
  readonly collection: readonly T[];
  readonly item: T;
};

export function takeLastItem<T>(
  collection: readonly T[],
): TakeLastItemResult<T> {
  if (collection.length === 0) {
    throw new Error("Collection is empty.");
  }

  const newCollection = [...collection];
  const item = newCollection.pop()!;

  return {
    collection: newCollection,
    item,
  };
}
