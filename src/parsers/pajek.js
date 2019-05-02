import matchLink from "./matchers/link";

export default function (lines, parseLinks = true) {
  const result = {
    vertices: [],
    links: [],
  };

  let context = "";

  lines.forEach((line) => {
    if (line.startsWith("*")) {
      const match = line.match(/^\*(vertices|edges|arcs)/i);
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
    } else if (parseLinks && (context === "edges" || context === "arcs")) {
      const match = matchLink(line);
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

