export default function (string) {
  const match = string.match(/^#\s?codelength.*?([0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?)/i);
  return match ? +match[1] : null;
}
