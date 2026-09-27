type TryTakeItemResult<T> = {
  readonly collection: readonly T[];
  readonly item: T | undefined;
};

export function tryTakeItem<T>(
  collection: readonly T[],
  index: number,
): TryTakeItemResult<T> {
  return {
    collection: collection.filter((_, i) => i !== index),
    item: collection[index],
  };
}
