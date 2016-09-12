// CTCI Linked Lists

// Singly Linked List in ES6

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._length = 0;
  }

  addToHead(node) {
    if (!this.head && !this.tail) {
      [ this.head, this.tail ] = [ node, node ];
    } else {
      let currentHead = this.head;
      this.head = node;
      this.head.next = currentHead;
    }
    this._length++;
    return this.head.value;
  }

  removeFromHead() {
    if (!this.head) return null;
    [ let temp, this.head ] = [ this.head, this.head.next ];
    this._length--;
    return temp.value;
  }

  addToTail(node) {
    if (!this.head && !this.tail) {
      [ this.head, this.tail ] = [ node, node ];
    } else {
      this.tail.next = node;
      this.tail = node;
    }
    this._length++;
    return this.tail.value;
  }

  contains(value) {
    let current = this.head;
    while (current !== null ) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  length() {
    return this._length;
  }
}

// 2.1 Remove Duplicates from Linked List
  // Easy way to do this is to use a hashtable and check if value was already stored
  // TIME: O(n), SPACE: O(n)
  function removeDuplicates(list) {
    let current = list.head;
    let reference = { current: 1 };
    while (current.next !== null) {
      // if reference has already seen the next value
      while (reference[current.next.value]) {
        current.next = current.next.next;
      }
      // else add the next to reference and keep moving down list
      reference[current.next] = 1;
      current = current.next;
    }
    return list;
  }

  // If you can't use hash table, then iterate twice for each value (using 2 pointers)
  // TIME: O(N), SPACE: O(1)
  function removeDups(list) {
    let current = list.head;
    // outer loop
    while (current !== null) {
      // compare all succeeding nodes
      let node = current;
      while (node.next !== null) {
        while (node.next === current.value) {
          node.next = node.next.next;
        }
        node = node.next;
      }
      // move onto the next one
      current = current.next;
    }
    return list;
  }

// 2.2 Return Kth to Last element in a singly LL
  // Use 2 pointers, current and runner -- when current hits end, runner will be k away
  // TIME: O(N), SPACE: O(1)
  function returnKth(node, k) {
    let index = 0;
    let current = node;
    while (current !== null) {
      if (index === k) {
        let runner = node;
      }
      if (runner) {
        runner = runner.next;
      }
      current = current.next;
      index++;
    }
    return runner.value;
  }

// 2.3 Delete a specified middle node in a linked list, given access to ONLY that node
// Example: input is a node "C" that is in a LL: A -> B -> C -> D
// Output should return nothing, but list should be A -> B -> D
  // The trick is to copy over the data from the next node, and then delete it... savage
  function removeMiddleNode(node) {
    if (!node.next) {
      // bad input
      return false;
    }
    node.value = node.next.value;
    node.next = node.next.next;
    return true;
  }
