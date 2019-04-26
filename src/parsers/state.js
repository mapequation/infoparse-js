export default function (lines, parseLinks = true) {
  const result = {
    vertices: [],
    states: [],
    links: [],
  };

  let context = "";

  lines.forEach((line) => {
    if (line.startsWith("*")) {
      const match = line.match(/^\*(vertices|states|links)/i);
      context = match ? match[1].toLowerCase() : "";
    } else if (context === "vertices") {
      const match = line.match(/(\d+) "(.+)"/);
      if (match) {
        const [_, id, name] = match;
        result.vertices.push({
          id: +id,
          name,
        });
      }
    } else if (context === "states") {
      const match = line.match(/(\d+) (\d+)(?: "(.+)")?/);
      if (match) {
        const [_, id, physicalId, name] = match;
        result.states.push({
          id: +id,
          physicalId: +physicalId,
          name,
        });
      }
    } else if (context === "links" && parseLinks) {
      const match = line.match(/(\d+) (\d+)(?: (\d+(?:\.\d+)?))?/);
      if (match) {
        const [_, source, target, weight] = match;
        result.links.push({
          source: +source,
          target: +target,
          weight: weight ? +weight : null,
        });
      }
    }
  });

  return result;
}

