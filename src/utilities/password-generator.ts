function randomInt(n: number): number {
  return Math.floor(Math.random() * n);
}

function pick(str: string, count: number): string {
  let picked: string = '';
  for (let index = 0; index < count; index++) {
    picked += str.charAt(randomInt(str.length));
  }
  return picked;
}

// Fisher–Yates shuffle
// Start from last index working backwards to index 1 and swap the chars
export function shuffle(str: string): string {
  const shuffled: string[] = Array.from(str);
  for (let index = shuffled.length - 1; index > 0; index--) {
    const randomIndex = randomInt(index + 1);
    [shuffled[randomIndex], shuffled[index]] = [
      shuffled[index],
      shuffled[randomIndex],
    ];
  }
  return shuffled.join('');
}

export function generatePassword({
  upper = 2,
  lower = 2,
  digits = 2,
  symbols = 2,
}: {
  upper?: number;
  lower?: number;
  digits?: number;
  symbols?: number;
} = {}): string {
  const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWER = 'abcdefghijklmnopqrstuvwxyz';
  const DIGITS = '0123456789';
  const SYMBOLS = '!@#$%^&*';

  const password =
    pick(UPPER, upper) +
    pick(LOWER, lower) +
    pick(DIGITS, digits) +
    pick(SYMBOLS, symbols);

  return shuffle(password);
}
