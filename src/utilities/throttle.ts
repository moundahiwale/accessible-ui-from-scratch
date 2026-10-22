export function throttle<A extends unknown[]>(
  fn: (...args: A) => void,
  delay: number,
) {
  let isCoolingDown = false;
  let pendingArgs: A | null = null;

  function startCoolDown() {
    isCoolingDown = true;
    setTimeout(() => {
      if (pendingArgs) {
        fn(...pendingArgs);
        pendingArgs = null;
        startCoolDown();
      } else {
        isCoolingDown = false;
      }
    }, delay);
  }

  return function (...args: A) {
    if (isCoolingDown) {
      pendingArgs = args;
      return;
    }

    fn(...args);
    startCoolDown();
  };
}
