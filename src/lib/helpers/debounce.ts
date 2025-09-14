export function debounce<T extends unknown[]>(
  fn: (...args: T) => void,
  time: number,
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), time);
  };
}
