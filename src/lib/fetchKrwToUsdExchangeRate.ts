export async function fetchKRWToUSDExchangeRate(): Promise<number> {
  const url = 'https://open.er-api.com/v6/latest/usd';
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch exchange rates: ${response.status}`);
  }

  const data = await response.json();

  if (data.result !== 'success') {
    throw new Error('Exchange rate API returned an error.');
  }

  const krwRate = data.rates.KRW;
  if (!krwRate) {
    throw new Error('KRW rate not found in exchange rate data.');
  }

  return krwRate;
}
