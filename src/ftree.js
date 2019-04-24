import matchCodelength from "./codelength";


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
        const match = line.match(/^\*(links) (root|\d(?::\d)*) (\d(?:\.\d+)?) (\d+) (\d+)/i);
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
        const match = line.match(/(\d(?::\d)+) (\d(?:\.\d+)?) "(.+)" (\d+)(?: (\d+))?/);
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
        const match = line.match(/(\d+) (\d+) (\d(?:\.\d+)?)/);
        if (match) {
          const [_, sourceId, targetId, weight] = match;
          currentModule.links.push({
            sourceId: +sourceId,
            targetId: +targetId,
            weight: +weight,
          });
        }
      }
    },
  );

  return result;
}
