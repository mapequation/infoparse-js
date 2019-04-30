export default function (line) {
  // path flow name id [physicalId]
  return line.match(/(\d+(?::\d+)+) ([0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?) "(.+)" (\d+)(?: (\d+))?/);
}
