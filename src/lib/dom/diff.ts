import { VNode } from "../jsx/type";
import createElement from "./client";
function updateElement(
  parent: Node,
  newNode: VNode,
  oldNode: VNode,
  index: number = 0
) {
  if (!newNode && oldNode) {
    return parent.removeChild(parent.childNodes[index]);
  }

  if (newNode && !oldNode) {
    return parent.appendChild(createElement(newNode));
  }

  if (
    (typeof newNode === "string" && typeof oldNode === "string") ||
    (typeof newNode === "number" && typeof oldNode === "number")
  ) {
    if (newNode === oldNode) return;
    return parent.replaceChild(
      createElement(newNode),
      parent.childNodes[index]
    );
  }

  if (typeof newNode === "object" && typeof oldNode === "object") {
    if (newNode.tag !== oldNode.tag) {
      return parent.replaceChild(
        createElement(newNode),
        parent.childNodes[index]
      );
    }

    updateAttributes(
      parent.childNodes[index] as Element,
      newNode.props || {},
      oldNode.props || {}
    );

    const maxLength = Math.max(
      newNode.children.length,
      oldNode.children.length
    );
    for (let i = 0; i < maxLength; i++) {
      updateElement(
        parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

function updateAttributes(
  target: Element,
  newProps: Record<string, any>,
  oldProps: Record<string, any>
) {
  // Update or add new properties
  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] === newProps[attr]) continue;
    if (attr.startsWith("on") && typeof value === "function") {
      const eventName = attr.toLowerCase().substring(2);
      target.removeEventListener(eventName, oldProps[attr] as EventListener);
      target.addEventListener(eventName, value as EventListener);
    } else {
      target.setAttribute(attr, String(value));
    }
  }

  // Remove old properties
  for (const attr of Object.keys(oldProps)) {
    if (newProps[attr] !== undefined) continue;
    if (attr.startsWith("on")) {
      const eventName = attr.toLowerCase().substring(2);
      target.removeEventListener(eventName, oldProps[attr] as EventListener);
    } else {
      target.removeAttribute(attr);
    }
  }
}

export { updateElement };
