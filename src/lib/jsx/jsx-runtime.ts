import { Props, VNode, Component } from "./type";

function h(component: string | Component, props: Props, ...children: VNode[]) {
  if (typeof component === "function") return component({ ...props, children });

  return {
    tag: component,
    props,
    children: children.flat(),
  };
}

export { h };
