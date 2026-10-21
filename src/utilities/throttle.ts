export function throttle<A extends unknown[]>(
  fn: (...args: A) => void,
  delay: number,
) {
  let isCoolingDown = false;

  return function (...args: A) {
    if (isCoolingDown) return;

    fn(...args);
    isCoolingDown = true;
    setTimeout(() => {
      isCoolingDown = false;
    }, delay);
  };
}
