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
