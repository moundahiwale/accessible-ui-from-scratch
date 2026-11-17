export function maxProfit(prices: number[]): number {
  let lowestBuyPrice = Infinity;
  let bestProfit = 0;

  for (const currentPrice of prices) {
    if (currentPrice < lowestBuyPrice) {
      lowestBuyPrice = currentPrice;
    }

    // profit if sold today
    const profit = currentPrice - lowestBuyPrice;

    if (profit > bestProfit) {
      bestProfit = profit;
    }
  }

  return bestProfit;
}
