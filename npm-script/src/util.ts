const whitespaceRegExp = new RegExp("[\\s]");

export function containsWhitespace(str: string): boolean {
   return whitespaceRegExp.test(str);
}

export function logInfo(msg: string) {
  log(console.info, msg);
}

export function logError(msg: string) {
  log(console.error, msg);
}

export function logWarn(msg: string) {
  log(console.warn, msg);
}

function log(logger: (msg: string) => void, msg: string) {
  logger(timePrefix() + '  ' + msg);
}

// source: https://github.com/ionic-team/ionic-app-scripts/blob/efc4039e3350b4d0e9a476c56a3d2cd35f3b6f8d/src/logger/logger.ts
function timePrefix(): string {
  const date = new Date();
  return '[' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2) + ']';
}
