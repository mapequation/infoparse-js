import matchCodelength from "./codelength";


export default function (lines) {
  const result = {
    codelength: null,
    nodes: [],
  };

  lines.forEach((line) => {
    if (!result.codelength) {
      result.codelength = matchCodelength(line);
    }
    const match = line.match(/(\d+) (\d+) (\d(?:\.\d+)?)(?: (\d+))?/);
    if (match) {
      let [_, id, module, flow, physId] = match;
      physId = +physId;
      id = +id;
      const stateId = physId ? id : null;
      result.nodes.push({
        path: [module, stateId || physId],
        flow: +flow,
        name: id.toString(),
        id: physId ? physId : id,
        stateId,
      });
    }
  });

  return result;
}