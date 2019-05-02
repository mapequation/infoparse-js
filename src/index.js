import parseClu from "./parsers/clu";
import parseFTree from "./parsers/ftree";
import parseMap from "./parsers/map";
import parsePajek from "./parsers/pajek";
import parseState from "./parsers/state";
import parseTree from "./parsers/tree";


export {
  parseClu,
  parseFTree,
  parseMap,
  parsePajek,
  parseState,
  parseTree,
};

export const parsers = new Map(Object.entries({
  clu: parseClu,
  ftree: parseFTree,
  map: parseMap,
  pajek: parsePajek,
  net: parseState,
  tree: parseTree,
}));

export const validExtensions = [...parsers.keys()];

export const isValidExtension = ext => validExtensions.includes(ext);

export const getParserForExtension = ext => parsers.get(ext);
