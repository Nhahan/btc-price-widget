export const getCoinIconUrl = (coin: string): string => {
	const icons: { [key: string]: string } = {
		btc: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
		eth: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
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
