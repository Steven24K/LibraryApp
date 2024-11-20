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

// Exercise 1

// Reduce function for List
export const reduce = <a, b>(
    list: List<a>,
    reducer: (acc: b, value: a) => b,
    initialValue: b
): b => {
    let result = initialValue;
    while (list.kind === 'node') {
        result = reducer(result, list.value);
        list = list.tail;
    }
    return result;
};

// Map function for List
export const map = <a, b>(
    list: List<a>,
    mapper: (value: a) => b,
): List<b> => {
    if (list.kind === 'empty') return EmptyNode();
    return ListNode(mapper(list.value), map(list.tail, mapper));
};

// Convert List to Array
export const toArray = <a>(list: List<a>): a[] => {
    const result: a[] = [];
    while (list.kind === 'node') {
        result.push(list.value);
        list = list.tail;
    }
    return result;
};

// Count the number of elements in List
export const count = <a>(list: List<a>): number => {
    let length = 0;
    while (list.kind === 'node') {
        length++;
        list = list.tail;
    }
    return length;
};

// Filter elements in List
export const filter = <a>(
    list: List<a>,
    predicate: (value: a) => boolean
): List<a> => {
    if (list.kind === 'empty') return EmptyNode();
    if (predicate(list.value)) {
        return ListNode(list.value, filter(list.tail, predicate));
    }
    return filter(list.tail, predicate);
};

// Example Usage
console.log("Reduced sum:", reduce(list1, (acc, val) => acc + val, 0));
console.log("Mapped (doubled):", toArray(map(list1, x => x * 2)));
console.log("To array:", toArray(list1));
console.log("Count:", count(list1));
console.log("Filtered (only even):", toArray(filter(list1, x => x % 2 === 0)));

