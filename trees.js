// CTCI Trees

// Trees in ES6

class Tree {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

class BinaryTree {
  constructor(value) {
    this.value;
    this.left = null;
    this.right = null;
  }
}

// 4.2 Minimal Tree: Given a sorted (increasing order) array with unique integer elements, write an
// algorithm to create a binary search tree with minimal height
  // Basically, generate a balanced BST
  // This requires balancing and rotating the root whenever the tree is getting unbalanced

  // One way to think about it is to consider the minimal height as log(n) where n is the number of elements in the array
  // Perhaps we can do binary search and add that element to the tree, adding each subsequent array as children

  const minimalTree = (array) => {
    const middleIndex = Math.floor(array.length / 2);
    const node = new BinaryTree(array[middleIndex]);
    let left = array.slice(0, middleIndex);
    let right = array.slice(middleIndex + 1, array.length);
    if (left.length > 0) {
      node.left = minimalTree(left);
    }
    if (left.length > 0) {
      node.right = minimalTree(right);
    }
    return node;
  };

// 4.3 List of Depths: Given a binary tree, design an algorithm which creates a linked list of all the nodes
// at each depth (e.g., if you have a tree with depth D, you'll have D linked lists).
  // This is a breadth-first search problem, where we create a new LL for each "tier" in the tree
  // Initial jank solution: Recursive function that has a results array and appends each "level" children to array
  const depthList = (node) => {
    let results = [];
    // check if node has value
    if (!node) {
      return false;
    }
    let currentList = new LinkedList();
    currentList.head = addToHead(node);  
    // iterate through children
    while (currentList.length() > 0) { // as long as there are children
      results.push(currentList);
      let parentList = currentList;
      currentList = new LinkedList();
      // cycle through parents (previously current) and grab child nodes
      let parent = parentList.head;
      while (parent !== null) {
        if (parent.left) {
          currentList.addToTail(parent.left);
        }
        if (parent.right) {
          currentList.addToTail(parent.right);
        }
        parent = parent.next;
      }
    }
    return results;
  };

// 4.4 Check Balanced: Implement a function to check if a binary tree is balanced. 
// For the purposes of this question, a balanced tree is defined to be a tree such that 
// the heights of the two subtrees of any node never differ by more than one.
  // Compute heights of each subtree while recursing through the tree
  const checkBalanced = (node, level) => {
    level = level || 0;
    if (!node) {
      return level;
    }
    level++;
    left = checkBalanced(node.left, level);
    right = checkBalanced(node.right, level);
    if (left === -1 || right === -1 || Math.abs(left - right) > 1) {
      return -1; // to keep consistent with returning numbers -> -1 is falsey
    }
    return Math.max(left, right);
  };

// 4.5 Validate BST: Implement a function to check if a binary tree is a binary search tree.
  // Basic recursion, checking for values to make sure that left < node, right > node, while taking into account the parents
  const validateBST = (node, min, max) => {
    // base case
    let min = min || Number.MIN_VALUE;
    let max = max || Number.MAX_VALUE;
    if (!node) {
      return true;
    }
    if (node.left && (node.left.value > node.value || node.left.value < min)) {
      return false;
    }
    if (node.right && (node.right.value < node.value || node.right.value > max)) {
      return false;
    }
    return validateBST(node.left, min, node.value) && validateBST(node.right, node.value, max);
  };



