type ListNode<a> = {
    kind: 'node'
    value: a
    tail: List<a>
}

type EmptyNode<a> = {
    kind: 'empty'
}

type ListMethods<a> = {
    reduce: <b>(this: List<a>, f: (acc: b, curr: a) => b, initial: b) => b
    map: <b>(f: (v: a) => b) => List<b>
    toArray: () => a[]
    count: () => number
    filter: (predicate: (x: a) => boolean) => List<a>
}

export type List<a> = (ListNode<a> | EmptyNode<a>) & ListMethods<a>

const ListMethods = <a>(): ListMethods<a> => ({
    reduce: function<b>(this: List<a>, f: (acc: b, v: a) => b, init: b): b {
        if (this.kind == 'empty') return init
        return this.tail.reduce(f, f(init, this.value))
    },
    map: function<b>(this: List<a>, f: (v: a) => b): List<b> {
        return this.reduce((acc, v) => ListNode(f(v), acc), EmptyNode())
    },
    toArray: function(this: List<a>): a[] {
        return this.reduce((acc, v) => acc.concat([v]), Array<a>())
    },
    filter: function(this: List<a>, predicate: (x: a) => boolean): List<a> {
        return this.reduce((acc, v) => predicate(v) ? ListNode(v, acc) : acc, EmptyNode())
    },
    count: function(this: List<a>): number {
        return this.reduce((acc, _) => acc + 1, 0)
    }
})

export const ListNode = <a>(_v: a, _tail: List<a>): List<a> => ({
    kind: 'node',
    value: _v,
    tail: _tail,
    ...ListMethods<a>()
})

export const EmptyNode = <a>(): List<a> => ({
    kind: 'empty',
    ...ListMethods<a>()
})
