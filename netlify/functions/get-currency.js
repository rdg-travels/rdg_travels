const COUNTRY_CURRENCY = {
  NG: { code: 'NGN', symbol: '₦' },
  GB: { code: 'GBP', symbol: '£' },
  US: { code: 'USD', symbol: '$' },
  CA: { code: 'CAD', symbol: 'CA$' },
  AU: { code: 'AUD', symbol: 'A$' },
  NZ: { code: 'NZD', symbol: 'NZ$' },
  DE: { code: 'EUR', symbol: '€' },
  FR: { code: 'EUR', symbol: '€' },
  IT: { code: 'EUR', symbol: '€' },
  ES: { code: 'EUR', symbol: '€' },
  NL: { code: 'EUR', symbol: '€' },
  BE: { code: 'EUR', symbol: '€' },
  AT: { code: 'EUR', symbol: '€' },
  PT: { code: 'EUR', symbol: '€' },
  IE: { code: 'EUR', symbol: '€' },
  FI: { code: 'EUR', symbol: '€' },
  GR: { code: 'EUR', symbol: '€' },
  AE: { code: 'AED', symbol: 'AED' },
  ZA: { code: 'ZAR', symbol: 'R' },
  GH: { code: 'GHS', symbol: 'GH₵' },
  KE: { code: 'KES', symbol: 'KSh' },
  JP: { code: 'JPY', symbol: '¥' },
  CN: { code: 'CNY', symbol: '¥' },
  IN: { code: 'INR', symbol: '₹' },
  BR: { code: 'BRL', symbol: 'R$' },
  MX: { code: 'MXN', symbol: 'MX$' },
  SG: { code: 'SGD', symbol: 'S$' },
  CH: { code: 'CHF', symbol: 'CHF' },
  SE: { code: 'SEK', symbol: 'kr' },
  NO: { code: 'NOK', symbol: 'kr' },
  DK: { code: 'DKK', symbol: 'kr' },
  SA: { code: 'SAR', symbol: 'SAR' },
  QA: { code: 'QAR', symbol: 'QAR' },
  EG: { code: 'EGP', symbol: 'E£' },
};

exports.handler = async (event) => {
  const country = (event.headers['x-country'] || '').toUpperCase();
  const currency = COUNTRY_CURRENCY[country] || { code: 'USD', symbol: '$' };

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    body: JSON.stringify({ country, code: currency.code, symbol: currency.symbol }),
  };
};
