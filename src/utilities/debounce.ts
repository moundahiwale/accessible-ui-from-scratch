export function search(searchString: string, no: number) {
  console.log(searchString, no);
}

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

const debouncedSearch = debounce(search, 1000)

debouncedSearch('s', 1)
debouncedSearch('se', 2)
debouncedSearch('sea', 3)
debouncedSearch('sear', 4)
debouncedSearch('searc', 5)
debouncedSearch('search', 6)

// npx tsx debounce.ts
// Output => search 6