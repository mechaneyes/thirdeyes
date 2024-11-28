export const formatContent = (content) => {
  if (!content) return "";

  return content
    .split("\n")
    .map((line) => {
      if (line.startsWith("## ")) {
        const headerText = line.replace("## ", "").trim();
        return `<h3>${headerText}</h3>`;
      }
      return line;
    })
    .join("\n");
};

export const formatText = (text) => {
  if (!text) return null;

  // Remove "Page:" and "Summary:" prefixes
  const cleanText = text.replace(/^Page:.*\nSummary:\s*/, "");

  return cleanText
    .split("\n")
    .filter((line) => line.trim().length > 0) // kill empty lines
    .map((line, index) => {
      if (line.startsWith("##")) {
        const headerText = line.replace("## ", "").trim();
        return (
          <h4 key={index} className="font-normal text-lg mt-4 mb-2">
            {headerText}
          </h4>
        );
      }
      return (
        // only paragraphs for non-empty lines
        line.trim() && (
          <p key={index} className="mb-2">
            {line}
          </p>
        )
      );
    });
};
