// sleep to delay the execution by ms milliseconds
const sleep = (ms: number) => {
  // using resolve inside setTimeout, means resolve this promise after ms milliseconds
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
};

export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  baseDelay = 100,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await sleep(baseDelay * Math.pow(2, attempt));
      }
    }
  }

  throw lastError;
}
