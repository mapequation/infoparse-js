import parseClu from "./parsers/clu";
import parseFTree from "./parsers/ftree";
import parseMap from "./parsers/map";
import parseState from "./parsers/state";
import parseTree from "./parsers/tree";


export { parseClu, parseFTree, parseMap, parseState, parseTree };

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

