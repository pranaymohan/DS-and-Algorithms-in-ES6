// CTCI Strings and Arrays

// String and Array Problems in ES6

// 1.1 Implement an algorithm to determine if a string has all unique characters. 
  // When in doubt, hash it out
  // Time: O(N), Space: O(N)
  const isUnique = (string) => {
    let reference = {};
    string.forEach((char) => {
      if (ref[char]) {
        return false;
      } else {
        ref[char] = 1;
      }
    });
    return true;
  };

  // What if you cannot use additional data structures?
  // Time: O(N^2), Space: O(1)* -> *not entirely sure if so, and why
  const isUniqueNoHash = (string) => {
    for (var i = 0; i < string.length; i++) {
      var current = char[i];
      for (var j = i + 1; j < string.length; j++) {
        if (string[j] === current) {
          return false;
        }
      }
    }
    return true;
  };

// 1.2 Check Permutation: Given two strings,write a method to decide if one is a permutation of the other.
  // ** Make sure to ask about edge cases, like caps and spaces!

  // Accidentally assumed the problem was about subsets rather than permutations -- whoops!
  // We'll assume that we're checking if b is a permutation of a
  // Naive way is to build a hashtable of a, and if b has any values that aren't in a, then return false
  const checkSubset = (a, b) => {
    var ref = {};
    a.forEach((char) => {
      ref[char] = ref[char] || 0;
      ref[char]++;
    });
    b.forEach((char) => {
      if (!ref[char]) {
        return false;
      } else {
        ref[char] -= 1;
        // check if its negative to see if there are more of the same letter in b than a
        if (ref[char] < 0) {
          return false;
        }
      }
    });
    return true;
  };

/* 1.4 Given a string, write a function to check if it is a permutation of a palin­drome. 
A palindrome is a word or phrase that is the same forwards and backwards. 
A permutation is a rearrangement of letters. The palindrome does not need to be 
limited to just dictionary words. */

  // Assumptions: ignore space, capitals treated same as lowercase
  // If string is even length, then all letters must be even
  // If string is odd, all letters (except one) are even
  // ... when in doubt, hash it out
  const palindromePermutation = (string) => {
    let hash = {};
    string.forEach(char => {
      if (!hash[char]) {
        hash[char] = 0;
      }
      hash[char]++;
    });
    let numberOfOdds = 0;
    for (key in hash) {
      if (hash[key] % 2 !== 0) {
        numberOfOdds++;
      }
      if (numberOfOdds > 1) {
        return false;
      }
    }
    return true;
  };

