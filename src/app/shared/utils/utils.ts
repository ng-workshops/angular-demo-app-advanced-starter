export const FLOAT_REGEX = /^\-?\d+((\.|,)?(\d+)?)?$/;
export const INTEGER_REGEX = /^\-?\d+$/;

export function isEmpty(arg: any) {
  return arg === '' || arg === null || arg === undefined;
}

export function getFloat(value: string, numberOfDigits = 2) {
  if (!value) {
    return null;
  }

  if (FLOAT_REGEX.test(value)) {
    return roundToDecimal(parseFloat(value.replace(',', '.')), numberOfDigits);
  }

  return null;
  // return value.toString();
}

export function getInt(value: string) {
  if (!value) {
    return null;
  }

  if (INTEGER_REGEX.test(value)) {
    return parseInt(value, 10);
  }

  return null;
  // return value.toString();
}

export function roundToDecimal(num: number, decimal: number) {
  let zeros = (1.0).toFixed(decimal);
  zeros = zeros.substr(2);
  const mul_div = parseInt('1' + zeros, 10);
  const increment = parseFloat('.' + zeros + '01');

  if ((num * (mul_div * 10)) % 10 >= 5) {
    num += increment;
  }

  return Math.round(num * mul_div) / mul_div;
}

export function cutToDecimal(num: number, decimal: number) {
  // check range for decimal value
  if (decimal < 0 || decimal > 20) {
    decimal = 0;
  }

  // ensure decimal is an integer
  decimal = Math.floor(decimal);

  const multiplier = Math.pow(10, decimal);
  return (
    Math.floor(parseFloat(num.toString()) * multiplier) / multiplier
  ).toFixed(decimal);
}
