import { EmptyNode, List, ListNode } from "./list";

export const fromArray = <a>(arr: a[]): List<a> =>
    arr.reduce((acc, v) => ListNode(v, acc), EmptyNode<a>())