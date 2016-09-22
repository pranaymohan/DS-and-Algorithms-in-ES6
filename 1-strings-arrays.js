// CTCI Strings and Arrays

// String and Array Problems in ES6

// BASIC: reverse a string
  // swap until midpoint
  const reverseString = (string) => {
    let array = string.split('');
    for (let i = array.length - 1; i >= Math.floor(array.length / 2); i--) {
      [ array[i], array[array.length - i - 1] ] = [ array[array.length - i - 1], array[i] ];
    }
    return array.join('');
  }

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
    for (let i = 0; i < string.length; i++) {
      let current = char[i];
      for (let j = i + 1; j < string.length; j++) {
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
    let ref = {};
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


// How can you match substring of a sting?
  // Examples:
  // > subStringFinder('abbcdabbbbbck', 'ab')
  //   = 0
  // > subStringFinder('abbcdabbbbbck', 'bck')
  //   = 9
  // doesn't work for this one.
  // > subStringFinder('abbcdabbbbbck', 'bbbck')  
  //   = -1

  // Run 2 pointers, if the pointers for the substring reach the end, then return index
  const substringFinder = (string, substring) => {
    let i, j, resultIndex;
    for (i = 0, j = 0; i < string.length; i++) {
      // check if values are equal on substring vs string
      if (string[i] === substring[j]) {
        // increment substring to keep up with string
        j++;
      } else {
        // didn't work, reset substring index
        j = 0;
      }

      // check if j is 0, if so, reset index at i
      if (j === 0) {
        // have to add 1 because its an inclusive index
        resultIndex = i + 1;
      } else if (j === substring.length) {
        // else, we hit a match! return index
        return resultIndex;
      }
    }
    // index wasn't returned inside of loop, therefore not found!
    return -1;
  }


/* 1.5 One Away: given two strings, write a function to check if they are
one or zero edits away.

Eg.

pale, ple -> true
pales, pale -> true
pale, bale -> true
pale, bake -> false

*/

// We know if the length is the same, we have to have a replace
// Otherwise if shorter, delete, and longer, addition
const checkReplace = (a, b) => {
  let skips = 0;
  for (let i = 0; i < a.length; i++) {
    if (skips > 1) {
      return false;
    }
    if (a[i] !== b[i]) {
      skips++;
    }
  }
  return true;
}

const checkInsertRemove = (longer, shorter) => {
  let skips = 0;
  let l = 0;
  let s = 0;
  while (s < shorter.length) {
    if (skips > 1) {
      return false;
    }
    if (longer[l] !== shorter[s]) {
      skips++;
      // adjust the longer pointer to skip
      l++;
    }
    s++;
    l++;
  }
  return true;
}

const oneAway = (string1, string2) => {
  if (string1.length === string2.length) {
    // check replace
    return checkReplace(string1, string2);
  } else if (string1.length - 1 === string2.length) {
    // check insert with string1 as longer
    return checkInsertRemove(string1, string2);
  } else if (string2.length - 1 === string1.length) {
    // check insert with string2 as longer
    return checkInsertRemove(string2, string1);
  } else {
    return false;
  }
}

console.log(oneAway('pale', 'ple')); // => true
console.log(oneAway('pale', 'pales')); // => true
console.log(oneAway('pale', 'bale')); // => true
console.log(oneAway('pale', 'bake')); // => false

/*
1.6 Implement a method to perform basic string compression using 
the counts of repeated characters. For example, the string aabcccccaaa 
would become a2blc5a3. If the "compressed" string would not become smaller 
than the original string, your method should return the original string.
*/

const stringCompression = (string) => {
  let current = string[0];
  let count = 1;
  let flag = false;
  let result = [];
  for (let i = 1; i < string.length; i++) {
    // check the char
    if (string[i] !== current) {
      // add the previous one to the array, reset count
      result.push(current + '' + count);
      current = string[i];
      count = 1;
    } else {
      // switch flag
      if (flag === false) flag = true;
      //continue the chain
      count++;
    }
  }
  // one more push
  result.push(current + '' + count);
  // check flag
  if (flag === true) {
    return result.join('');
  } else {
    return string;
  }
}

console.log(stringCompression('pale')); // => 'pale'
console.log(stringCompression('aabcccccaaa')); // => 'a2blc5a3'

/*
1.8 Zero Matrix: Write an algorithm such that if an element in an MxN
matrix is 0, its entire row and column are set to 0
*/

// use a column and row tracker
const zeroMatrix = (matrix) => {
  // check for null array
  if (matrix.length === 0) {
    return matrix;
  }
  let rows = Array(matrix.length).fill(1);
  let columns = Array(matrix[0].length).fill(1);
  // iterate through matrix and set the benchmark arrays to 0
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (matrix[r][c] === 0) {
        rows[r] = 0;
        columns[c] = 0;
      }
    }
  }
  // iterate through matrix again and set the values to 0;
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[0].length; c++) {
      if (rows[r] === 0 || columns[c] === 0) {
        matrix[r][c] = 0;
      }
    }
  }
  return matrix;
}

m = [[1, 0, 1, 1, 0],
     [0, 1, 1, 1, 0],
     [1, 1, 1, 1, 1],
     [1, 0, 1, 1, 1],
     [1, 1, 1, 1, 1]];

console.log(zeroMatrix(m));

/*
OUTPUT => [[0, 0, 0, 0, 0],
           [0, 0, 0, 0, 0],
           [0, 0, 1, 1, 0],
           [0, 0, 0, 0, 0],
           [0, 0, 1, 1, 0]];
*/



















