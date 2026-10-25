export function promiseAll<T>(values: (T | Promise<T>)[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    if (values.length === 0) {
      resolve([]);
      return;
    }

    const results: T[] = [];
    let completed = 0;
    values.forEach((value, index) => {
      Promise.resolve(value)
        .then((result) => {
          results[index] = result;
          completed++;
          if (completed === values.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}
