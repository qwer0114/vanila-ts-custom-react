import { VNode } from "../jsx/type";
import { updateElement } from "../dom/diff";
import createElement from "../dom/client";

let oldVNode: VNode | null = null;
let rootContainer: Element | null = null;
let rootElement: (() => VNode) | null = null;

function renderComponent() {
  if (rootContainer && rootElement) {
    const newVNode = rootElement();
    if (oldVNode) {
      updateElement(rootContainer, newVNode, oldVNode);
    } else {
      rootContainer.appendChild(createElement(newVNode));
    }
    oldVNode = newVNode;
  }
}

function createRoot(container: Element) {
  rootContainer = container;
  return {
    render: (element: () => VNode) => {
      rootElement = element;
      renderComponent();
    },
  };
}

export { renderComponent, createRoot };
