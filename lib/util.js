module.exports = class Util {
  static syncStdoutProgress(text, appendNewline = false) {
    process.stdout.cursorTo(0);
    process.stdout.clearLine(1);
    process.stdout.write(text);

    if (appendNewline) {
      process.stdout.write('\n');
    }
  }
}
