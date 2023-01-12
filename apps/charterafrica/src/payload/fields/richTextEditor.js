import escapeHTML from "escape-html";
import React, { Fragment } from "react";
import { Text } from "slate";

const richTextEditor = {
  admin: {
    elements: [
      "h2",
      "h3",
      "h4",
      "link",
      {
        name: "cta",
        plugins: [
          // any plugins that are required by this element go here
        ],
      },
    ],
    leaves: [
      "bold",
      "italic",
      {
        name: "highlight",
        plugins: [],
      },
    ],
    link: {
      // Inject your own fields into the Link element
      fields: [
        {
          name: "rel",
          label: "Rel Attribute",
          type: "select",
          hasMany: true,
          options: ["noopener", "noreferrer", "nofollow"],
        },
      ],
    },
    upload: {
      collections: {
        media: {
          fields: [
            // any fields that you would like to save
            // on an upload element in the `media` collection
          ],
        },
      },
    },
  },
};

export const serialize = (children) =>
  children?.map((node) => {
    const i = Math.random();
    if (Text.isText(node)) {
      let text = (
        <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      );

      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }

      if (node.code) {
        text = <code key={i}>{text}</code>;
      }

      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      // Handle other leaf types here...

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case "h1":
        return <h1 key={i}>{serialize(node.children)}</h1>;
      // Iterate through all headings here...
      case "h6":
        return <h6 key={i}>{serialize(node.children)}</h6>;
      case "quote":
        return <blockquote key={i}>{serialize(node.children)}</blockquote>;
      case "ul":
        return <ul key={i}>{serialize(node.children)}</ul>;
      case "ol":
        return <ol key={i}>{serialize(node.children)}</ol>;
      case "li":
        return <li key={i}>{serialize(node.children)}</li>;
      case "link":
        return (
          <a href={escapeHTML(node.url)} key={i}>
            {serialize(node.children)}
          </a>
        );

      default:
        return <p key={i}>{serialize(node.children)}</p>;
    }
  });

export default richTextEditor;
