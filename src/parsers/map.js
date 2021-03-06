import matchCodelength from "./matchers/codelength";
import matchLink from "./matchers/link";


export default function (lines, parseLinks = true, parseModules = true) {
  const result = {
    codelength: null,
    modules: [],
    nodes: [],
    links: [],
  };

  let context = "";

  lines.forEach((line) => {
    if (!result.codelength) {
      result.codelength = matchCodelength(line);
    }
    if (line.startsWith("*")) {
      const match = line.match(/^\*(modules|nodes|links)/i);
      context = match ? match[1].toLowerCase() : "";
    } else if (context === "modules" && parseModules) {
      const match = line.match(/(\d+) "(.+)" ([0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?) ([0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?)/);
      if (match) {
        const [_, module, name, flow, exitFlow] = match;
        result.modules.push({
          module: +module,
          name,
          flow: +flow,
          exitFlow: +exitFlow,
        });
      }
    } else if (context === "nodes") {
      const match = line.match(/(\d+(?::\d+)+) "(.+)" ([0-9]*\.?[0-9]+(?:[eE][-+]?[0-9]+)?)/);
      if (match) {
        const [_, path, name, flow] = match;
        result.nodes.push({
          path,
          name,
          flow: +flow,
        });
      }
    } else if (context === "links" && parseLinks) {
      const match = matchLink(line);
      if (match) {
        const [_, source, target, flow] = match;
        result.links.push({
          source: +source,
          target: +target,
          flow: +flow,
        });
      }
    }
  });

  return result;
}
