// CTCI Stacks and Queues

// Stack and Queue Problems in ES6

// Stack in ES6

class Stack {
  constructor() {
    this.top = null;
    this.size = 0;
  }
  pop() {
    if (this.isEmpty()) {
      return null;
    }
    let node = this.top;
    this.top = node.next;
    this.size--;
    return node.data;
  }
  push(data) {
    let node = new StackNode(data);
    node.next = this.top;
    this.top = node;
    this.size++;
  }
  peek() {
    if (!this.isEmpty()) {
      return this.top.data;
    }
    return null;
  }
  isEmpty() {
    return this.size === 0;
  }
}

class StackNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Queue in ES6
  // Basically a linkedlist

class Queue {
  constructor() {
    this.front = null;
    this.back = null;
    this.size = 0;
  }
  enqueue(data) {
    let node = new QueueNode(data);
    // check if empty queue
    if (this.isEmpty()) {
      this.front = node;
    } else {
      this.back.next = node;
    }
    this.back = node;
    this.size++;
  }
  dequeue() {
    if (this.isEmpty()) {
      return null;
    } else {
      let node = this.front;
      this.front = node.next;
      this.size--;
      return node.data;
    }
  }
  peek() {
    if (!this.isEmpty()) {
      return this.front.data;
    }
    return null;
  }
  isEmpty() {
    return this.size === 0;
  }
}

class QueueNode {
  constructor(data) {
    this.data = data
    this.next = null;
  }
}

/*
3.4 Implement a MyQueue class that implements a queue using two stacks
*/

class MyQueue {
  constructor() {
    this.inbox = new Stack();
    this.outbox = new Stack();
  }
  enqueue(data) {
    this.inbox.push(data);
  }
  dequeue() {
    // check if both stacks empty
    if (this.isEmpty()) {
      return null;
    } else if (this.outbox.isEmpty()) {
      // else if the outbox is empty, then need to move everything from inbox to outbox
      while (!this.inbox.isEmpty()) {
        this.outbox.push(this.inbox.pop());
      }
    }
    return this.outbox.pop();
  }
  isEmpty() {
    return this.inbox.isEmpty() && this.outbox.isEmpty();
  }
}

let q = new MyQueue();
q.enqueue(1);
q.enqueue(2);
console.log(q.dequeue()); // 1
console.log(q.dequeue()); // 2