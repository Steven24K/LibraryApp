type ListNode<a> = {
    kind: 'node'
    value: a
    tail: List<a>
}

type EmptyNode<a> = {
    kind: 'empty'
}

type ListMethods<a> = {
    reduce: <b>(this: List<a>, f: (acc: b, v: a) => b, init: b) => b
    map: <b>(f: (v: a) => b) => List<b>
    toArray: () => a[]
    count: () => number
    filter: (predicate: (v: a) => boolean) => List<a>
}

export type List<a> = (ListNode<a> | EmptyNode<a>) & ListMethods<a>

const ListMethods = <a>(): ListMethods<a> => ({
    reduce: function <b>(this: List<a>, f: (acc: b, v: a) => b, init: b): b {
        // base case? 
        if (this.kind == 'empty') return init
        // Action
        return this.tail.reduce(f, f(init, this.value))//reducer(init, this.value) 
    },
    map: function <b>(this: List<a>, f: (v: a) => b): List<b> {
        return this.reduce((acc, v) => ListNode(f(v), acc), EmptyNode())
        // if (this.kind =='empty') return EmptyNode()
        // return ListNode(f(this.value), this.tail.map(f))
    },
    toArray: function (this: List<a>): a[] {
        return this.reduce((acc, v) => acc.concat([v]), Array<a>()) // <a>[]
    }, 
    count: function (this: List<a>): number {
        return this.reduce((acc, _) => acc + 1, 0)
    }, 
    filter: function (this: List<a>, predicate: (v: a) => boolean): List<a> {
        return this.reduce((acc, v) => predicate(v) ? ListNode(v, acc) : acc , EmptyNode())
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

// i.e. 
const list1: List<number> =
    ListNode(1,
        ListNode(2,
            ListNode(3,
                ListNode(4,
                    ListNode(5, EmptyNode())))))


list1.reduce((acc, v) => acc + v + ", ", "")