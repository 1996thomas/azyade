import { PortableTextComponents } from "@portabletext/react";

export const components: PortableTextComponents = {
  block: {
    // Custom renderer for italic text
    em: ({ children }) => (
      <em className="text-gray-600 font-semibold">{children}</em>
    ),
    // Custom renderer for bold text
    strong: ({ children }) => (
      <strong className="font-bold text-black">{children}</strong>
    ),
    // Custom renderer for underlined text
    underline: ({ children }) => <span className="underline">{children}</span>,
    // Custom renderer for highlighted text
    highlight: ({ children }) => (
      <mark className="bg-yellow-200">{children}</mark>
    ),
    // Custom renderer for paragraphs with spacing
    normal: ({ children }) => (
      <p className="my-4 leading-relaxed text-gray-800">{children}</p>
    ),
    // Custom renderers for headers (h1, h2, h3, etc.)
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold my-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold my-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium my-4">{children}</h3>
    ),
    // Custom renderer for block quotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4 text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    // Custom renderer for ordered list
    number: ({ children }) => (
      <ol className="list-decimal list-inside my-4 ml-6">{children}</ol>
    ),
    // Custom renderer for unordered list
    bullet: ({ children }) => (
      <ul className="list-disc list-inside my-4 ml-6">{children}</ul>
    ),
  },
  marks: {
    // Custom renderer for links
    link: ({ value, children }) => {
      const target = value?.href?.startsWith("http") ? "_blank" : "_self";
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },
};
