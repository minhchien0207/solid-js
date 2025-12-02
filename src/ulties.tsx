const chunkArray = (array: any[], size: number) => {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
};

const chunk2Array = (array: any[]) => {
  const chunkedArray = [];
  const end = array.length > 2 ? Math.round(array.length / 2) : array.length;
  chunkedArray.push(array.slice(0, end));
  if (array.length > 2) {
    chunkedArray.push(array.slice(end, end + array.length));
  }
  return chunkedArray;
};

const convertCurrency = (number: string | number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(typeof number === 'string' ? Number(number) : number);
};

const numb2CurrencyStr = (number: number, lang: string = 'vn') => {
  let result: string | number;
  let res = 0;
  switch (true) {
    case number < 1000:
      result = number.toString();
      break;
    case number < 1000000:
      res = number % 1000;
      result = `${(number / 1000).toFixed(res === 0 ? 0 : 1)}${lang === 'vn' ? ' nghìn' : 'K'}`;
      break;
    case number < 1000000000:
      res = number % 1000000;
      result = `${(number / 1000000).toFixed(res === 0 ? 0 : 1)}${lang === 'vn' ? ' triệu' : 'M'}`;
      break;
    case number < 1000000000000:
      res = number % 1000000000;
      result = `${(number / 1000000000).toFixed(res === 0 ? 0 : 1)}${lang === 'vn' ? ' tỷ' : 'B'}`;
      break;
    default:
      result = 0;
      break;
  }
  return result;
};

export { chunkArray, chunk2Array, convertCurrency, numb2CurrencyStr };
