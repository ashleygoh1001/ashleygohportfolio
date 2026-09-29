import Markdoc from "@markdoc/markdoc";
import React from "react";

type MarkdocField = () => Promise<{ node: unknown }>;

export async function MarkdocContent({
  content,
  className = "markdoc",
}: {
  content: MarkdocField;
  className?: string;
}) {
  const doc = await content();
  const node = doc.node as Parameters<typeof Markdoc.validate>[0];
  const errors = Markdoc.validate(node);
  if (errors.length) {
    console.error(errors);
    return null;
  }
  const renderable = Markdoc.transform(node);
  return (
    <div className={className}>{Markdoc.renderers.react(renderable, React)}</div>
  );
}
