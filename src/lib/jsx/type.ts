type VNode = string | number | VDOM;
type Props = Record<string, any> | null;

type VDOM = {
  tag: string;
  props: Props;
  children: VNode[];
};

type Component = (props?: Props) => VDOM;

export type { VNode, Props, Component };
