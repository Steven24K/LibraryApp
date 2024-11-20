type ListNode<a> = {
    kind: 'node'
    value: a
    tail: List<a>
}

type EmptyNode<a> = {
    kind: 'empty'
}

export type List<a> = (ListNode<a> | EmptyNode<a>)

export const ListNode = <a>(_v: a, _tail: List<a>): ListNode<a> => ({
    kind: 'node',
    value: _v,
    tail: _tail
})

export const EmptyNode = <a>(): EmptyNode<a> => ({ kind: 'empty' })

// i.e. 
const list1: List<number> = ListNode(1, ListNode(2, ListNode(3, ListNode( 4, ListNode(5, EmptyNode())))))
