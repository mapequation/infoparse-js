import { readFile } from "fs";
import { basename, extname } from "path";
import { getParserForExtension } from "./index";


if (process.argv.length < 3) {
  console.log(`Usage: ${basename(process.argv[1])} input-file`);
  process.exit();
}

const args = process.argv.slice(2);
const filename = args.shift();
const format = args.shift() || null;

readFile(filename, "utf8", parse(filename, format));

function parse(filename, format = null) {
  const ext = format || extname(filename).substring(1);
  const parser = getParserForExtension(ext);
  return (err, data) => {
    if (err) throw err;
    const lines = data.split("\n").filter(Boolean);
    const parsed = parser(lines);
    const json = JSON.stringify(parsed, null, 2);
    console.log(json);
  };
}
