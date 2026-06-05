export async function funcCacheAside<T>({
  getCache,
  getSource,
  setCache,
}: {
  getCache: () => Promise<T | null>;
  getSource: () => Promise<T>;
  setCache: (value: T) => Promise<void>;
}): Promise<T> {
  const cached = await getCache();
  if (cached) {
    return cached;
  }
  const data = await getSource();
  await setCache(data);
  return data;
}