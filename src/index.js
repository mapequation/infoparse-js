export { parseClu } from "./parsers/clu";
export { parseFTree } from "./parsers/ftree";
export { parseMap } from "./parsers/map";
export { parseState } from "./parsers/state";
export { parseTree } from "./parsers/tree";

import parseClu from "./parsers/clu";
import parseFTree from "./parsers/ftree";
import parseMap from "./parsers/map";
import parseState from "./parsers/state";
import parseTree from "./parsers/tree";


export const parsers = {
  clu: parseClu,
  ftree: parseFTree,
  map: parseMap,
  net: parseState,
  tree: parseTree,
};

export const validExtensions = Object.keys(parsers);

export const isValidExtension = ext => validExtensions.includes(ext);

export const getParserForExtension = ext => parsers[ext];

