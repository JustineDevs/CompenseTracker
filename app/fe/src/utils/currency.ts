export interface Currency {
  code: string;
  name: string;
  symbol: string;
  locale: string;
  decimalDigits: number;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  // Major Global Currencies
  { code: 'USD', name: 'US Dollar', symbol: '$', locale: 'en-US', decimalDigits: 0 },
  { code: 'EUR', name: 'Euro', symbol: '€', locale: 'de-DE', decimalDigits: 0 },
  { code: 'GBP', name: 'British Pound Sterling', symbol: '£', locale: 'en-GB', decimalDigits: 0 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', locale: 'ja-JP', decimalDigits: 0 },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', locale: 'de-CH', decimalDigits: 0 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', locale: 'en-CA', decimalDigits: 0 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', locale: 'en-AU', decimalDigits: 0 },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', locale: 'en-NZ', decimalDigits: 0 },
  
  // European Currencies
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', locale: 'sv-SE', decimalDigits: 0 },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', locale: 'nb-NO', decimalDigits: 0 },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', locale: 'da-DK', decimalDigits: 0 },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', locale: 'pl-PL', decimalDigits: 0 },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', locale: 'cs-CZ', decimalDigits: 0 },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', locale: 'hu-HU', decimalDigits: 0 },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', locale: 'ro-RO', decimalDigits: 0 },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', locale: 'bg-BG', decimalDigits: 0 },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', locale: 'hr-HR', decimalDigits: 0 },
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'дин', locale: 'sr-RS', decimalDigits: 0 },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', locale: 'uk-UA', decimalDigits: 0 },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', locale: 'ru-RU', decimalDigits: 0 },
  { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', locale: 'be-BY', decimalDigits: 0 },
  
  // Asian Currencies
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', locale: 'zh-CN', decimalDigits: 0 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', locale: 'ja-JP', decimalDigits: 0 },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', locale: 'ko-KR', decimalDigits: 0 },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', locale: 'en-IN', decimalDigits: 0 },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', locale: 'en-PK', decimalDigits: 0 },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳', locale: 'bn-BD', decimalDigits: 0 },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: '₨', locale: 'si-LK', decimalDigits: 0 },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨', locale: 'ne-NP', decimalDigits: 0 },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', locale: 'th-TH', decimalDigits: 0 },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', locale: 'vi-VN', decimalDigits: 0 },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', locale: 'id-ID', decimalDigits: 0 },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', locale: 'ms-MY', decimalDigits: 0 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', locale: 'en-SG', decimalDigits: 0 },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱', locale: 'en-PH', decimalDigits: 0 },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', locale: 'en-HK', decimalDigits: 0 },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', locale: 'zh-TW', decimalDigits: 0 },
  { code: 'MOP', name: 'Macanese Pataca', symbol: 'MOP$', locale: 'zh-MO', decimalDigits: 0 },
  
  // Middle East & Africa
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', locale: 'ar-AE', decimalDigits: 0 },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', locale: 'ar-SA', decimalDigits: 0 },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق', locale: 'ar-QA', decimalDigits: 0 },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', locale: 'ar-KW', decimalDigits: 0 },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: 'د.ب', locale: 'ar-BH', decimalDigits: 0 },
  { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.', locale: 'ar-OM', decimalDigits: 0 },
  { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', locale: 'ar-JO', decimalDigits: 0 },
  { code: 'LBP', name: 'Lebanese Pound', symbol: 'ل.ل', locale: 'ar-LB', decimalDigits: 0 },
  { code: 'EGP', name: 'Egyptian Pound', symbol: '£', locale: 'ar-EG', decimalDigits: 0 },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', locale: 'he-IL', decimalDigits: 0 },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺', locale: 'tr-TR', decimalDigits: 0 },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', locale: 'en-ZA', decimalDigits: 0 },
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', locale: 'en-NG', decimalDigits: 0 },
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', locale: 'en-KE', decimalDigits: 0 },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: '₵', locale: 'en-GH', decimalDigits: 0 },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', locale: 'ar-MA', decimalDigits: 0 },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', locale: 'ar-TN', decimalDigits: 0 },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', locale: 'ar-DZ', decimalDigits: 0 },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', locale: 'am-ET', decimalDigits: 0 },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', locale: 'en-UG', decimalDigits: 0 },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', locale: 'sw-TZ', decimalDigits: 0 },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', locale: 'en-ZM', decimalDigits: 0 },
  { code: 'BWP', name: 'Botswana Pula', symbol: 'P', locale: 'en-BW', decimalDigits: 0 },
  { code: 'NAD', name: 'Namibian Dollar', symbol: 'N$', locale: 'en-NA', decimalDigits: 0 },
  { code: 'SZL', name: 'Swazi Lilangeni', symbol: 'L', locale: 'en-SZ', decimalDigits: 0 },
  { code: 'LSL', name: 'Lesotho Loti', symbol: 'L', locale: 'en-LS', decimalDigits: 0 },
  
  // Americas
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', locale: 'pt-BR', decimalDigits: 0 },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', locale: 'es-MX', decimalDigits: 0 },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', locale: 'es-AR', decimalDigits: 0 },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', locale: 'es-CL', decimalDigits: 0 },
  { code: 'COP', name: 'Colombian Peso', symbol: '$', locale: 'es-CO', decimalDigits: 0 },
  { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', locale: 'es-PE', decimalDigits: 0 },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U', locale: 'es-UY', decimalDigits: 0 },
  { code: 'VES', name: 'Venezuelan Bolívar', symbol: 'Bs', locale: 'es-VE', decimalDigits: 0 },
  { code: 'BOB', name: 'Bolivian Boliviano', symbol: 'Bs', locale: 'es-BO', decimalDigits: 0 },
  { code: 'PYG', name: 'Paraguayan Guarani', symbol: '₲', locale: 'es-PY', decimalDigits: 0 },
  { code: 'GTQ', name: 'Guatemalan Quetzal', symbol: 'Q', locale: 'es-GT', decimalDigits: 0 },
  { code: 'HNL', name: 'Honduran Lempira', symbol: 'L', locale: 'es-HN', decimalDigits: 0 },
  { code: 'NIO', name: 'Nicaraguan Córdoba', symbol: 'C$', locale: 'es-NI', decimalDigits: 0 },
  { code: 'CRC', name: 'Costa Rican Colón', symbol: '₡', locale: 'es-CR', decimalDigits: 0 },
  { code: 'PAB', name: 'Panamanian Balboa', symbol: 'B/.', locale: 'es-PA', decimalDigits: 0 },
  { code: 'DOP', name: 'Dominican Peso', symbol: 'RD$', locale: 'es-DO', decimalDigits: 0 },
  { code: 'JMD', name: 'Jamaican Dollar', symbol: 'J$', locale: 'en-JM', decimalDigits: 0 },
  { code: 'TTD', name: 'Trinidad and Tobago Dollar', symbol: 'TT$', locale: 'en-TT', decimalDigits: 0 },
  { code: 'BBD', name: 'Barbadian Dollar', symbol: 'Bds$', locale: 'en-BB', decimalDigits: 0 },
  { code: 'XCD', name: 'East Caribbean Dollar', symbol: 'EC$', locale: 'en-AG', decimalDigits: 0 },
  
  // Oceania
  { code: 'FJD', name: 'Fijian Dollar', symbol: 'FJ$', locale: 'en-FJ', decimalDigits: 0 },
  { code: 'PGK', name: 'Papua New Guinean Kina', symbol: 'K', locale: 'en-PG', decimalDigits: 0 },
  { code: 'SBD', name: 'Solomon Islands Dollar', symbol: 'SI$', locale: 'en-SB', decimalDigits: 0 },
  { code: 'VUV', name: 'Vanuatu Vatu', symbol: 'Vt', locale: 'en-VU', decimalDigits: 0 },
  { code: 'WST', name: 'Samoan Tala', symbol: 'WS$', locale: 'en-WS', decimalDigits: 0 },
  { code: 'TOP', name: 'Tongan Paʻanga', symbol: 'T$', locale: 'to-TO', decimalDigits: 0 },
  { code: 'KID', name: 'Kiribati Dollar', symbol: '$', locale: 'en-KI', decimalDigits: 0 },
  
  // Other Major Currencies
  { code: 'ISK', name: 'Icelandic Krona', symbol: 'kr', locale: 'is-IS', decimalDigits: 0 },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', locale: 'nb-NO', decimalDigits: 0 },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', locale: 'da-DK', decimalDigits: 0 },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', locale: 'sv-SE', decimalDigits: 0 },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', locale: 'cs-CZ', decimalDigits: 0 },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', locale: 'hu-HU', decimalDigits: 0 },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', locale: 'pl-PL', decimalDigits: 0 },
  { code: 'RON', name: 'Romanian Leu', symbol: 'lei', locale: 'ro-RO', decimalDigits: 0 },
  { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', locale: 'bg-BG', decimalDigits: 0 },
  { code: 'HRK', name: 'Croatian Kuna', symbol: 'kn', locale: 'hr-HR', decimalDigits: 0 },
  { code: 'RSD', name: 'Serbian Dinar', symbol: 'дин', locale: 'sr-RS', decimalDigits: 0 },
  { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', locale: 'uk-UA', decimalDigits: 0 },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽', locale: 'ru-RU', decimalDigits: 0 },
  { code: 'BYN', name: 'Belarusian Ruble', symbol: 'Br', locale: 'be-BY', decimalDigits: 0 },
  
  // Cryptocurrencies (for modern compensation packages)
  { code: 'BTC', name: 'Bitcoin', symbol: '₿', locale: 'en-US', decimalDigits: 8 },
  { code: 'ETH', name: 'Ethereum', symbol: 'Ξ', locale: 'en-US', decimalDigits: 6 },
  { code: 'USDT', name: 'Tether', symbol: '₮', locale: 'en-US', decimalDigits: 2 },
  { code: 'USDC', name: 'USD Coin', symbol: 'USDC', locale: 'en-US', decimalDigits: 2 },
  { code: 'BNB', name: 'Binance Coin', symbol: 'BNB', locale: 'en-US', decimalDigits: 4 },
  { code: 'ADA', name: 'Cardano', symbol: '₳', locale: 'en-US', decimalDigits: 4 },
  { code: 'SOL', name: 'Solana', symbol: '◎', locale: 'en-US', decimalDigits: 4 },
  { code: 'DOT', name: 'Polkadot', symbol: '●', locale: 'en-US', decimalDigits: 4 },
  { code: 'MATIC', name: 'Polygon', symbol: '⬟', locale: 'en-US', decimalDigits: 4 },
  { code: 'AVAX', name: 'Avalanche', symbol: '🔺', locale: 'en-US', decimalDigits: 4 },
];

export function getCurrencyByCode(code: string): Currency | undefined {
  return SUPPORTED_CURRENCIES.find(currency => currency.code === code);
}

export function formatCurrency(amount: number, currencyCode: string = 'USD'): string {
  const currency = getCurrencyByCode(currencyCode);
  if (!currency) {
    // Fallback to USD if currency not found
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: currency.decimalDigits,
    maximumFractionDigits: currency.decimalDigits,
  }).format(amount);
}

export function formatCurrencyCompact(amount: number, currencyCode: string = 'USD'): string {
  const currency = getCurrencyByCode(currencyCode);
  if (!currency) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  }

  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: currency.code,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
}

export function getCurrencySymbol(currencyCode: string = 'USD'): string {
  const currency = getCurrencyByCode(currencyCode);
  return currency?.symbol || '$';
}

export function parseCurrencyAmount(formattedAmount: string, currencyCode: string = 'USD'): number {
  // Remove currency symbols and formatting
  const cleanAmount = formattedAmount
    .replace(/[^\d.,-]/g, '') // Remove all non-numeric characters except digits, commas, dots, and minus
    .replace(/,/g, '') // Remove thousands separators
    .replace(/\./g, ''); // Remove decimal points for currencies that don't use them

  return parseFloat(cleanAmount) || 0;
}
