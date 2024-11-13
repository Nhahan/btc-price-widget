export const getCoinIconUrl = (coin: string): string => {
  const icons: { [key: string]: string } = {
    btc: bitcoinIconBase64,
    eth: ethereumIconBase64,
  };
  return icons[coin] || '';
};

export const getCoinName = (coin: string): string => {
  const names: { [key: string]: string } = {
    btc: 'Bitcoin',
    eth: 'Ethereum',
  };
  return names[coin] || '';
};

export const getCurrentTimestamp = (): number => {
  return Date.now();
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export function generateNonce(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function generateFakeCoinData(days = 31, basePrice = 82500, variation = 2500, rate = 1, toFixed = 2) {
  let price = basePrice,
    lt = ((Math.random() - 0.5) * variation) / 100,
    st = ((Math.random() - 0.5) * variation) / 50;

  return Array.from({ length: days }, (_, i) => {
    const date = new Date(Date.now() - (days - 1 - i) * 86400000).toISOString().split('T')[0];

    if (Math.random() < 0.15) lt = ((Math.random() - 0.5) * variation) / 100;
    if (Math.random() < 0.5) st = ((Math.random() - 0.5) * variation) / 50;

    // Calculate the new price with variations and ensure it's non-negative
    price = Math.max(price + lt + st + ((Math.random() - 0.5) * variation) / 10, 0);

    if (i % 15 === 0) lt += ((Math.random() - 0.5) * variation) / 20;

    // Adjust the final price by multiplying by the rate and formatting
    const finalPrice = price * rate;

    return { date, price: parseFloat(finalPrice.toFixed(toFixed)) };
  });
}

const bitcoinIconBase64 =
  'data:image/webp;base64,UklGRsAFAABXRUJQVlA4TLMFAAAvMUAMEOowkLZN61/2tt9CREwAW4eA2XjLyf//nRP/I8+L5vfufr/fHwVfIZGBgAigSWOMBHoXEUGUk4CcjIxVQJXYi5g6IoAREScFCb1IioQIiJQIQhRjRNBhrGNEIKTtKEACUhirhDoy/igSek8mbRuTMZZ7gwRJsmkrnr5t27Zta2XubNu2bdu2bdu2fRi4baQoOV6mu3uD3Pr/lT3Zv3N3d3d3d3d3d/c8z7k3K2SM1JmCTXLOTYlswi7sA6WNSJ86YyL97TipMygdh9vyttmArRjlYSG2omUA0qdmIliC85SRkt8UrJIBaG2BlNw2b60wABHm/4uNECQBAAg0j8h2s23btm3bOtm2bdu2bdsM/Vfktm3D7nlK+4goERSokUAfWzzwxB4jZGEAPWaAAQ4y+NPGNvd88sd/t8cXj+zTSyRqEAFpxilocWGMF0BGPlgiFC5gDYAM77FeLZFzEmE5VQhI6DHbq6Wyiw2YRUBALM+1geepgL6AIZp7tZlMI5IFVkZqY9m6keE6wzWHBRBWwJgBagaIpKUxxNIpaKo5hAv569JSdNlB0jEHQgpTgEVNuQOmBCCI7mZh4bJY+N/lp5ekgHtQPO+So2znRG4FNSU1YHeCLk81hQWQknGdX2DpqXF2NQEg2f5YekqqQyYFJOFnpANImawpzABLtG95yuPt7k1ZW5CtgGvpEKZ270UpUZUazP9XsPTTVI7gbgf39LODJ1h66tQeuztfk4apPaCny3ZksgNjX9cxvMOjczUt2cBbDLOeLs2ZPEPbgzrN7KUhXWUpmf131KfjxpsM3CDa4li3pg8B0sy4qO4ugpC6Ohsqo+kDuUJJORWxnf6akZsCdDy5W8Xy01R57j9bOhgiA8oku9BE9POQnwPuFJ3YDYDv6RdZkcqBbRkAYHpPqQ6zAIqIX4wjcK35ORBl28X/B1CdeiEdyB5th67OKdtn/y1SVuRF8oDu/ZVHFF4mAKQ4mEkzwJgzeTs7AwCN6bYEhoj5b2tYzqJbg9DeCQA7/lLjUsrLLcVze7JoJFwjBB9XBSETuwbQv41zoci6OMW2LRh0kgkMUec1HxJlGyOA7Z8OZLcCdtcSaD+pDGxbUZnqXUnS3YwZ3/lD4WUAwNLTZv9tcDtPatPU3P67qhAKkSElFIjDajwf0t5xkNPh61SH7ksyMrHOItwpMr4rACM7ybn4urQO78CgMryjUBlrOg0WfdmQSNsYAfzS9p3IFWnrr7P/DmDxKU/cKCIoiEeLt+yh4DIAYItJwc5i7PgJABrS8UMnb8ELwTPpSILtvQNwz1/qXEqps/SLUuwESIO85fx7yFlLxvCXav6lvk2y78yeATx3IJsqVliQdOf/B8DSU2PsxMjvrH+AxhRvrsG4+H8AUJtGnQlNF5dpDgOAs3CZk7EISdxLnb0lN7k7qNPjiwhZelLSkRx2ZH4UZ7fRnSkmdu1OMUFE0WAgyXMCL0pXpLy3K9N7PoAqnf0f2kH/Nkd3qr70N/kB9PZEPEq9hTVpByYfySfY+/cZKOn6F07EAQwRMZJOyF+GycSAf7VpPiG4v3mD8iUNRsR1tjMvi9xLwGGc3U0B/gD0dKmtYwPb+fiit6sVqQiUFqUsQTpa4pdm7xvuH/M7mP/v21cOZL11dG4OBJdklILcBpQsJKeCC/lGd4LuLr63I+MrjOz4kdCE0CUlcdEf7WLwMhXwOd7uVanOvFjhK8VTNLXnSq4j9fAH0sE7UpORmbQEWmyUp7Sva+kXwdeD9rPR6Rq6s4uzvp1+8KaA30cjJew7avaiZOcYxUgL//Pa2BdoRk44GWgKq8hHXijIndWEcVrhiBJBxZLNcjibCV4UOkTsrTK4I390MIr98HHFzYkcffP/Px5o+NcF8abLXznhdbxtas3ikpmDC4bbYzR8ANZp1NcSQMw8gnHYOAp+yZMAAA==';
const ethereumIconBase64 =
  'data:image/webp;base64,UklGRqwDAABXRUJQVlA4TJ8DAAAvMUAMEBVJzvZPkZR0NgvcCnd36d8fd3dnff8/HELgRohTMztVpz3+w5hzhcDNJYE+YUey+GNBEAU3Tg4BbCKEwQVi2zaCpP4L/huFvntAjCQ5bpvP48UcH8wCB5Ul0bZt2tF4jG3btu303LKd9Gzbttu2bZdt2649ATYCeaZbY58pk93t98d34a6xHWblnN+HzO1yhHdXv7aaL6vFNjOGEuOi+y5sIcAxkC8rVhSjioHuK3TAn5DwrBgOGq818LADAryQUykjBj/fmCwNDlbJTSofRpTGrxj4GuKQDR8qGldKzMFJTP5M9Irmo7Y0A3+BUZnolbPG2xYcvCpUyUKVAGOmtOJYarFF5cCI0/jdGvhG6JwBQ02r6yXaUyHmkBk5BZNd/vzRfDSW6JsLd0GIGPgbEpeM4abxLtJb4cTd2EwssLBiCxuJBgevY1FPxBBizJfCBoYqdFc4cg+234SvE8xYI6wxZxvLtrCBcHeHNELoNIwkjT/3hwK/D96DrSbcfd2Cv3Vdz9rGEgsv3MF3croluRyajJsDVzh7F/bdi3+VwJvV9cxtLNzGmgUVIZzfTKEEPV1sT1fH6S7sNvG1IjzapK5nbGP+NlZt/Vm/pCY4do/gLnNQ+OOtN22hrqevP85b56+90O2z9cIDCQZPwH/DC+tfYWch7LhPchhr/9AVyyvxO38/BCgDKQSfDSOs/4f19fA9cdN2BHaZtFC8+oVs39BBMYIYiVc+Q2j8/z8BMYWMgF9bCevXYacmrFVMKC/MEtPVEjLEf/KxyvC6/QazfuEU+kF2wL+xsP4RdsbDjt2YfagtwitnKORc2ComZwrTK0uNxxqftepi6Fg1xcF08IH//xvW/8L6LKxDpn4Pz56blNAenBgF9z9bWr2K1/hZNO4z0q68IWagrrB7nXyauf08rIvCWtaeg/XgGwdfCd0sMSsexmApGn+12mb4Xm9wbhJ2jeUye23WtX9iMwWFCffA/w7++SQkUxlDTeO8lKLxVa9GGCZ3+yK2CCP0ABdH3R0cFwpZeoaPxodSSuHjaV9Vvpmd4Ad3d/AOFiPLkK9ovSrX+F9KKd13/e+4u4Pf5Ay3LBkSfCw3dF8hAnaAnHkYw0bjSTPwAIui5cpI/R77BvG2bPWKl43RyDNIvlzIfIyh9aUBnJZTxHJmBDI+PdxCgPeFppY1g2HUdt+FLfwORlvm10Lq4l0b283+9Reu3Oxsl96+exVsBBIA';
