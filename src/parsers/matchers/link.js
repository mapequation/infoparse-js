export default function (line) {
  // sourceId targetId flow
  return line.match(/(\d+) (\d+) (\d+(?:\.\d+)?)/);
}
