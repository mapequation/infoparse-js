export default function (line) {
  // sourceId targetId [flow]
  return line.match(/(\d+) (\d+)(?: ([0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?))?/);
}
