export default function (line) {
  // path flow name id [physicalId]
  return line.match(/(\d+(?::\d+)+) (\d+(?:\.\d+)?) "(.+)" (\d+)(?: (\d+))?/);
}
