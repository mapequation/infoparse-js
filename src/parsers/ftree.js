import matchCodelength from "./matchers/codelength";
import matchTree from "./matchers/tree";
import matchLink from "./matchers/link";


export default function (lines, parseLinks = true) {
  const result = {
    codelength: null,
    nodes: [],
    modules: [],
  };

  let context = "nodes";
  let currentModule = null;

  lines.forEach((line) => {
      if (!result.codelength) {
        result.codelength = matchCodelength(line);
      }
      if (line.startsWith("*") && parseLinks) {
        const match = line.match(/^\*(links) (root|\d+(?::\d+)*) ([0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?) (\d+) (\d+)/i);
        if (match) {
          let [_, links, path, exitFlow, numEdges, numChildren] = match;
          context = links.toLowerCase();
          currentModule = {
            path,
            exitFlow: +exitFlow,
            numEdges: +numEdges,
            numChildren: +numChildren,
            links: [],
          };
          result.modules.push(currentModule);
        }
      } else if (context === "nodes") {
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
      } else if (context === "links" && currentModule) {
        const match = matchLink(line);
        if (match) {
          const [_, source, target, flow] = match;
          currentModule.links.push({
            source: +source,
            target: +target,
            flow: +flow,
          });
        }
      }
    },
  );

  return result;
}
