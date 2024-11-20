"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filter = exports.count = exports.toArray = exports.map = exports.reduce = exports.EmptyNode = exports.ListNode = void 0;
var ListNode = function (_v, _tail) { return ({
    kind: 'node',
    value: _v,
    tail: _tail
}); };
exports.ListNode = ListNode;
var EmptyNode = function () { return ({ kind: 'empty' }); };
exports.EmptyNode = EmptyNode;
// i.e. 
var list1 = (0, exports.ListNode)(1, (0, exports.ListNode)(2, (0, exports.ListNode)(3, (0, exports.ListNode)(4, (0, exports.ListNode)(5, (0, exports.EmptyNode)())))));
// Exercide 1
// Reduce function for List
var reduce = function (list, reducer, initialValue) {
    var result = initialValue;
    while (list.kind === 'node') {
        result = reducer(result, list.value);
        list = list.tail;
    }
    return result;
};
exports.reduce = reduce;
// Map function for List
var map = function (list, mapper) {
    if (list.kind === 'empty')
        return (0, exports.EmptyNode)();
    return (0, exports.ListNode)(mapper(list.value), (0, exports.map)(list.tail, mapper));
};
exports.map = map;
// Convert List to Array
var toArray = function (list) {
    var result = [];
    while (list.kind === 'node') {
        result.push(list.value);
        list = list.tail;
    }
    return result;
};
exports.toArray = toArray;
// Count the number of elements in List
var count = function (list) {
    var length = 0;
    while (list.kind === 'node') {
        length++;
        list = list.tail;
    }
    return length;
};
exports.count = count;
// Filter elements in List
var filter = function (list, predicate) {
    if (list.kind === 'empty')
        return (0, exports.EmptyNode)();
    if (predicate(list.value)) {
        return (0, exports.ListNode)(list.value, (0, exports.filter)(list.tail, predicate));
    }
    return (0, exports.filter)(list.tail, predicate);
};
exports.filter = filter;
// Example Usage
console.log("Reduced sum:", (0, exports.reduce)(list1, function (acc, val) { return acc + val; }, 0));
console.log("Mapped (doubled):", (0, exports.toArray)((0, exports.map)(list1, function (x) { return x * 2; })));
console.log("To array:", (0, exports.toArray)(list1));
console.log("Count:", (0, exports.count)(list1));
console.log("Filtered (only even):", (0, exports.toArray)((0, exports.filter)(list1, function (x) { return x % 2 === 0; })));
