// 1. Two sum

const twosum = (nums, target) => {
  const newMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (newMap.has(complement)) {
      return [newMap.get(complement), i];
    }
    newMap.set(nums[i], i);
  }
};

// 9. Palindrome Number

const isPalindrome = (x) => {
  let reverseNum = 0;
  let originalNum = x;
  while (x > 0) {
    reverseNum = reverseNum * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return reverseNum == originalNum;
};

// 13. Roman to Integer

const romanToInt = (s) => {
  const romanMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const currentValue = romanMap[s[i]];
    let nextValue = romanMap[s[i + 1]];
    if (nextValue && currentValue < nextValue) {
      total -= currentValue;
    } else {
      total += currentValue;
    }
  }
  return total;
};

// 27. Remove Element

const removeElement = (nums, val) => {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != val) {
      nums[k] = nums[i];
      k++;
    }
  }
  return k;
};

// 344. Reverse a String

const reverseString = (str) => {
  /*--------str.reverse() can also be used-----*/
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    [str[left], str[right]] = [str[right], str[left]];
    right--;
    left++;
  }
  return str;
};

// 409. Longest Palindrome

const longestPalindrome = (s) => {
  const freq = {};
  for (const char of s) {
    freq[char] = (freq[char] || 0) + 1;
  }
  let length = 0;
  let odd_found = false;
  for (const count of Object.values(freq)) {
    if (count % 2 === 0) {
      length += count;
    } else {
      length += count - 1;
      odd_found = true;
    }
  }
  if (odd_found) {
    length += 1;
  }
  return length;
};

// 1002. Find Common Characters

const commonChar = (words) => {
  let result = [];
  for (let char of words[0]) {
    if (words.every((word) => word.includes(char))) {
      result.push(char);
      words.map((word) => word.replace(char, ""));
    }
  }
  return result;
};

// 1051. Hight Checker

const heightChecker = (heights) => {
  let expected = [...heights].sort((a, b) => a - b);

  let mismatchCount = 0;
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] !== expected[i]) {
      mismatchCount += 1;
    }
  }
  return mismatchCount;
};

// 1122. Realative Sort Array

const relativeSortArray = (arr1, arr2) => {
  const orderMap = {};
  for (let i = 0; i < arr2.length; i++) {
    orderMap[arr2[i]] = i;
  }

  arr1.sort((a, b) => {
    if (a in orderMap && b in orderMap) {
      return orderMap[a] - orderMap[b];
    } else if (a in orderMap) {
      return -1;
    } else if (b in orderMap) {
      return 1;
    } else {
      return a - b;
    }
  });

  return arr1;
};
