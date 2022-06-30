import { validChars } from './Values';

export function validateFrame(inp: string): boolean {
  for (let i = 0; i < inp.length; i += 1) {
    const char = inp.charAt(i);
    if (!validChars.has(char)) {
      return false;
    }
  }
  if (inp.length === 2) {
    const char1 = inp.charAt(0);
    const char2 = inp.charAt(1);
    if (char1 === 'X') {
      return char2 === '-';
    }
    if (char1 === '/') {
      return false;
    }
    let throw1 = 0;
    if (char1 !== '-') {
      throw1 = parseInt(char1);
    }
    if (char2 === 'X') {
      return false;
    }
    if (char2 === '/') {
      return true;
    }
    let throw2 = 0;
    if (char2 !== '-') {
      throw2 = parseInt(char2);
    }
    return throw1 + throw2 < 10;
  }
  if (inp.length === 3) {
    const char1 = inp.charAt(0);
    const char2 = inp.charAt(1);
    const char3 = inp.charAt(2);
    if (char1 === '/') {
      return false;
    }
    if (char1 === 'X') {
      if (char2 === 'X') {
        return char3 !== '/';
      }
      return validateFrame(inp.slice(1));
    }
    let throw1 = 0;
    if (char1 !== '-') {
      throw1 = parseInt(char1);
    }
    if (char2 === 'X') {
      return false;
    }
    if (char2 === '/') {
      return char3 !== '/';
    }
    let throw2 = 0;
    if (char2 !== '-') {
      throw2 = parseInt(char2);
    }
    if (throw1 + throw2 >= 10) {
      return false;
    }
    return char3 === '-';
  }
  return false;
}
