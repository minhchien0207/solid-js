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

const toPlainText = (v: unknown): string => {
  if (v == null) return '';

  // primitive
  if (
    typeof v === 'string' ||
    typeof v === 'number' ||
    typeof v === 'boolean'
  ) {
    return String(v);
  }

  // array: duyệt từng phần và nối KHÔNG có dấu phẩy
  if (Array.isArray(v)) {
    return v.map(toPlainText).join('');
  }

  // DOM Node (thực sự đã render trên DOM)
  if (typeof Node !== 'undefined' && v instanceof Node) {
    return (v as HTMLElement).textContent ?? '';
  }

  // Nếu là function (trong Solid children có thể là function)
  if (typeof v === 'function') {
    try {
      const res = (v as Function)();
      return toPlainText(res);
    } catch {
      return '';
    }
  }

  // object — thử các trường phổ biến của React / Solid JSX
  if (typeof v === 'object') {
    const anyV: any = v;

    // React element: { props: { children: ... } }
    if (anyV && anyV.props && 'children' in anyV.props) {
      return toPlainText(anyV.props.children);
    }

    // Solid/other VDOM: { children: ... } hoặc children là function
    if (anyV && 'children' in anyV) {
      return toPlainText(anyV.children);
    }

    // Some implementations expose a single text field
    if (anyV && typeof anyV.text === 'string') {
      return anyV.text;
    }

    // Fallback: nếu toString cho ra chuỗi hữu dụng (không phải "[object Object]")
    try {
      const s = String(anyV);
      if (s && s !== '[object Object]') return s;
    } catch {}

    return '';
  }

  return String(v);
};

export {
  chunkArray,
  chunk2Array,
  convertCurrency,
  numb2CurrencyStr,
  toPlainText,
};
