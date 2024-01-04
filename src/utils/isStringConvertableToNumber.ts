export default function isStringConvertableToNumber(str: string): boolean {
  return /^-?\d+$/.test(str);
}
