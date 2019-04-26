export default function (line) {
  return line.match(/(\d+(?::\d+)+) (\d+(?:\.\d+)?) "(.+)" (\d+)(?: (\d+))?/);
}
