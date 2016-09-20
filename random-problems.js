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
