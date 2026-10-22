export function debounce<A extends unknown[]>(
  fn: (...args: A) => void,
  delay: number,
) {
  let timerId: ReturnType<typeof setTimeout> | undefined;
  
  const debounced = function (...args: A) {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  debounced.cancel = () => {
    clearTimeout(timerId);
  }

  return debounced;
}