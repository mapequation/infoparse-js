import matchCodelength from "../codelength";
import matchTree from "./matchers/tree";


export default function (lines) {
  const result = {
    codelength: null,
    nodes: [],
  };

  lines.forEach((line) => {
    if (!result.codelength) {
      result.codelength = matchCodelength(line);
    }
    const match = matchTree(line);
    if (match) {
      const [_, path, flow, name, id, physId] = match;
      result.nodes.push({
        path,
        flow: +flow,
        name,
        id: physId ? +physId : +id,
        stateId: physId ? +id : null,
      });
    }
  });

  return result;
}
