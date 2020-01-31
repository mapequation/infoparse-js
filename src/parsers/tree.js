import matchCodelength from "./matchers/codelength";
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
      const [_, path, flow, name, id, physId, layerId] = match;
      result.nodes.push({
        path,
        flow: +flow,
        name,
        id: physId ? +physId : +id,
        stateId: physId ? +id : null,
        layerId: layerId ? +layerId : null,
      });
    }
  });

  return result;
}
