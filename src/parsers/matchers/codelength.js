export default function (string) {
  const match = string.match(/^#\s?codelength.*?(\d+(?:\.\d+)?)/i);
  return match ? +match[1] : null;
}
