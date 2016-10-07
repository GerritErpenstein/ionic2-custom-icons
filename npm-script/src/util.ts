const whitespaceRegExp = new RegExp("[\\s]");

export function containsWhitespace(str: string): boolean {
   return whitespaceRegExp.test(str);
}
