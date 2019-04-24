export { parseClu } from "./clu";
export { parseFTree } from "./ftree";
export { parseMap } from "./map";
export { parseTree } from "./tree";

import parseClu from "./clu";
import parseFTree from "./ftree";
import parseMap from "./map";
import parseTree from "./tree";


export const parsers = {
  clu: parseClu,
  ftree: parseFTree,
  map: parseMap,
  tree: parseTree,
};

export const validExtensions = Object.keys(parsers);

export const isValidExtension = ext => validExtensions.includes(ext);

export const getParserForExtension = ext => parsers[ext];

