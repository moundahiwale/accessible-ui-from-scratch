export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  delay: number,
) {
  let timerId: ReturnType<typeof setTimeout> | undefined;
  
  return function (...args: A) {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}