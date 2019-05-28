import matchCodelength from "./matchers/codelength";


export default function (lines) {
  const result = {
    codelength: null,
    nodes: [],
  };

  let nodeNumber = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!result.codelength) {
      result.codelength = matchCodelength(line);
      if (result.codelength) continue;
    }

    const match = line.match(/(\d+)(?: (\d+)(?: ([0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?)(?: (\d+))?)?)?/);
    if (match) {
      let [_, id, module, flow, physId] = match;
      [module, id] = module ? [+module, +id] : [+id, nodeNumber];

      result.nodes.push({
        id: physId ? +physId : id,
        module,
        flow: flow ? +flow : null,
        stateId: physId ? id : null,
      });

      nodeNumber++;
    }
  }

  return result;
}
