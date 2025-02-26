import { VNode } from "../jsx/type";

function createElement(node: VNode) {
  if (node === null || node === undefined) {
    return document.createDocumentFragment();
  }

  if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(String(node));
  }

  const element = document.createElement(node.tag);

  Object.entries(node.props || {}).forEach(([attr, value]) => {
    if (attr.startsWith("on") && typeof value === "function") {
      const eventName = attr.toLocaleLowerCase().substring(2);
      element.addEventListener(eventName, value);
    } else {
      element.setAttribute(attr, value);
    }
  });

  const children = node.children.map((child) => createElement(child));
  children.forEach((child) => element.appendChild(child));

  return element;
}

export default createElement;
