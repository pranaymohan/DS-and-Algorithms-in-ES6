// Given an array A[] of n numbers and another number x, determine whether or not there exist two elements in A whose sum is exactly x.

// eg1. inputs: [5, 7, 3, -4, 1, 20] and 12, -> returns true
// eg2. inputs: [3, 2, 6, 11, 7, 0] and 12, -> returns false

// naive solution is n^2, how to optimize?
// sort and do pointer merging in middle (nlogn time)

const sortNumbers = (a, b) => {
    return a - b;
}

const pairSums = (array, sum) => {
  array.sort(sortNumbers);
  let left = 0;
  let right = array.length -1;
  while (left !== right) {
    if (array[left] + array[right] === sum) {
      return true;
    } else if (array[left] + array[right] < sum) {
      left++;
    } else if (array[left] + array[right] > sum) {
      right--;
    }
  }
  return false;
}

// EXTRA CREDIT: find 3 numbers in an array that add to a sum

/*

Randomly shuffle an array

*/

// Fisher-yates shuffle:
const shuffleArray = (array) => {
  let lastIndex = array.length - 1;
  while (lastIndex > 0) {
    let randomIndex = Math.floor(Math.random * length);
    [ array[randomIndex], array[lastIndex] ] = [ array[lastIndex], array[randomIndex] ];
    lastindex--;
  }
  return array;
}


/*

WORD LADDER 1

Given two words (beginWord and endWord), and a dictionary, find the length of shortest transformation sequence from beginWord to endWord, such that:

Only one letter can be changed at a time
Each intermediate word must exist in the dictionary
For example,

Given:
start = "hit"
end = "cog"
dict = ["hot","dot","dog","lot","log"]

As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
return its length 5.

Note:

Return 0 if there is no such transformation sequence.
All words have the same length.
All words contain only lowercase alphabetic characters.

SOLUTION: http://blog.sodhanalibrary.com/2015/05/word-ladder-with-javascript.html

*/

class WordNode {
  constructor(word, distance) {
    this.word = word;
    this.distance = distance;
  }
}

const wordLadder = (beginWord, endWord, dictionary) => {
  // cases that would faily automatically
  if (dictionary.length === 0 || beginWord.length !== endWord.length) {
    return 0;
  }
  // add the end word to the dictionary
  dictionary.push(endWord);
  // initialize queue to track the current word in the BFS
  wordQueue = [];
  wordQueue.push(new WordNode(beginWord, 1));
  // track the shortest path using distance variable
  let result = Number.MAX_VALUE; 
  while (wordQueue.length > 0) {
    let currentWord = wordQueue.pop();
    // check if it equals the end word
    if (currentWord.word === endWord) {
      // if so, store the distance if its less than current distance
      result = Math.min(currentWord.distance, result);
    }
    // iterate through word to do BFS
    for (let i = 0; i < currentWord.word.length; i++) {
      // split current word into array, as strings can't be manipulated in place
      let wordArray = currentWord.word.split('');
      // go through all chars in alphabet, and see if any match
      'abcdefghijklmnopqrstuvwxyz'.split('').forEach(char => {
        wordArray[i] = char;
        // form new word with each char
        let newWord = wordArray.join('');
        let index = dictionary.indexOf(newWord);
        // if match
        if (index > -1) {
          // add newWord to queue
          wordQueue.push(new WordNode(newWord, currentWord.distance + 1));
          // remove newWord from dictionary so it doesn't hit again
          dictionary.splice(index, 1);
        }
      });
    }
  }
  // return result
  return result === Number.MAX_VALUE ? 0 : result;
}

console.log(wordLadder('hit', 'cog', ["hot","dot","dog","lot","log"]));

/*

WORD LADDER 2

Given two words (beginWord and endWord), and a dictionary's word list, find all shortest transformation sequence(s) from beginWord to endWord, such that:

Only one letter can be changed at a time
Each intermediate word must exist in the word list
For example,

Given:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

Return
  [
    ["hit","hot","dot","dog","cog"],
    ["hit","hot","lot","log","cog"]
  ]

Note:
All words have the same length.
All words contain only lowercase alphabetic characters.

SOLUTION: https://dannywang0911.wordpress.com/2015/05/19/word-ladder/

*/

// Inputs: beginWord (String), endWord (string), dictionary (array of strings)
// Outputs: shortestTransformations (Array of array of strings)
// Edge cases/ concerns:
//  - all words same length
//  - lowercase alphabetical chars
//  - only change one letter at a time, all words have to exist in the dictionary

const wordLadder2 = (beginWord, endWord, dictionary) => {
  // initialize final results array
  let results = [];
  let shortestNumber = Number.MAX_VALUE;
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  let length = beginWord.length;
  // check bad conditions -- if so, return blank array
  if (!dictionary || !beginWord || !endWord || length !== endWord.length) {
    return results;
  }
  // add endWord to dictionary
  dictionary.push(endWord);
  // inner recursive function that continues as long as a while loop is running
  const irf = (currentWord, dictionary, path, count) => {
    // if current path doesn't exist, then initialize it
    // otherwise copy it so it doesn't mutate the original value;
    // same with count 
    if (path) {
      path = path.slice();
    } else {
      path = [];
    }
    count = count || 0;
    // update the path and count now that we've recursed
    path.push(currentWord);
    count++;
    // if current word is the end word, then append current path to the results array
    // however, we need to check whether it is the shortest one
    if (currentWord === endWord && count <= shortestNumber) {
      if (count < shortestNumber) {
        // update the count
        shortestNumber = count;
        results = [];
      }
      // add the path to the results array
      results.push(path);
      // return here to avoid any further searching
      return;
    }
    // do the breadth first search
    for (let i = 0; i < length; i++) {
      // iterate through all chars in english lowercase alphabet
      alphabet.forEach(char => {
        // create test word by slicing string up and inputing new char
        let testWord = currentWord.slice(0, i) + char + currentWord.slice(i + 1, length);
        // check if testWord exists in dictionary
        let index = dictionary.indexOf(testWord);
        if (index > -1) {
          // remove from dictionary to prevent circular traversal of this word
          // only if not endword (because we want to encounter it again!)
          let newDictionary = dictionary.slice(0, index) + dictionary.slice(index + 1, dictionary.length);
          // recurse with test word!
          irf(testWord, newDictionary, path, count);
        }
      });
    }
    // empty return statement, as we are mutating a closure variable
    return;
  }
  // invoke first irf
  irf(beginWord, dictionary);
  // return all shortest transformations
  return results;
}

console.log(wordLadder2('hit', 'cog', ["hot","dot","dog","lot","log"]));

/*

Given a XML file, translate the XML file into a tree

*/

// assume the file is called input.xml
// gonna write jQuery
  // Don't think this is right...
  // TODO: Review this solution

class Tree {
  constructor(element) {
    this.element = element;
    this.children = [];
  }
  addChild(child) {
    // adds child to this.children
    if (!child || !(child instanceof Tree)){
      child = new Tree(child);
    }
    this.children.push(child);
    return child;
  }
}

<script type="text/javascript">

$.get('input.xml', null, function(data) {
  var $root = $(data).find('') // need to input root element
  var tree = new Tree($root); // assume we have a tree builder which takes in the element
  function makeTree($node, tree) {
    $node.childNodes.forEach(childNode => {
      child = tree.addChild(new Tree(childNode));
      makeTree(childNode, child);
    });
    return;
  }
  return tree;
});

</script>

/*

Given a Pattern and a dictionary, print out all the strings  that match 
the pattern. where a character in the pattern is mapped uniquely to a 
character in the dictionary.

e.g 1. ("abc" , <"cdf", "too", "hgfdt" ,"paa">) -> output = "cdf" 
e.g 2. ("acc" , <"cdf", "too", "hgfdt" ,"paa">) -> output = "too", "paa" 

*/

// One option is to check unicode differences between each character
  // but that doesn't work if "paa" = "too" = "acc"
const encodePattern = (pattern) => {
  let encoder = {};
  let unique = 0;
  let result = '';
  for (let i = 0; i < pattern.length; i++) {
    // check if char is in hashmap
    if (!encoder[pattern[i]]) {
      encoder[pattern[i]] = unique;
      unique++;
    } else {
      result += encoder[pattern[i]];
    }
  }
  return result;
}

const patternMap = (pattern, dict) => {
  results = [];
  const encodedPattern = encodePattern(pattern);
  dict.forEach(word => {
    if (word.length === pattern.length && encodedPattern === encodePattern(word)) {
      results.push(word);
    }
  });
  return results;
}

console.log(patternMap("abc", ["cdf", "too", "hgfdt" ,"paa"])); // ['cdf']
console.log(patternMap("acc", ["cdf", "too", "hgfdt" ,"paa"])); // ['too', 'paa']



