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

// 121. Best Time To Buy and Sell Stock

const maxProfit = (prices) => {
  let maximumProfit = 0;
  let minStockPrice = prices[0];
  for (let i = 1; i < prices.length; i++) {
    let currentProfit = prices[i] - minStockPrice;
    if (prices[i] <= minStockPrice) {
      minStockPrice = prices[i];
    } else {
      maximumProfit = Math.max(currentProfit, maximumProfit);
    }
  }
  return maximumProfit;
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

// 1550. Three consecutive Odds

const threeConsecutiveOdds = (arr) => {
  let consecutiveOddCount = 0;
  for (let num of arr) {
    if (num % 2 !== 0) {
      consecutiveOddCount++;
      if (consecutiveOddCount === 3) return true;
    } else {
      consecutiveOddCount = 0;
    }
  }
  return false;
};

// 1791. Find the center of a star graph

const findCenter = (edges) => {
  const [a, b] = edges[0];
  const [c, d] = edges[1];
  return a === c || a === d ? a : b;
};

// 2037. Minimum Number of Moves to Seat Everyone
const minMovesToSeat = (seats, students) => {
  seats.sort((a, b) => a - b);
  students.sort((a, b) => a - b);
  let sum = 0;
  for (let i = 0; i < seats.length; i++) {
    sum += Math.abs(seats[i] - students[i]);
  }
  return sum;
};

// 3200. Maximum Height of a Triangle

const maxHeightOfTriangle = (red, blue) => {
  const maxTriangleHeight = (startingColor, otherColor) => {
    let maxHeight = 0;
    let usedStartingColor = 0;
    let usedOtherColor = 0;
    let height = 0;

    while (true) {
      height++;
      if (height % 2 === 1) {
        usedStartingColor += height;
        if (usedStartingColor <= startingColor) {
          maxHeight++;
        } else {
          break;
        }
      } else {
        usedOtherColor += height;
        if (usedOtherColor <= otherColor) {
          maxHeight++;
        } else {
          break;
        }
      }
    }

    return maxHeight;
  };

  const maxRedTriangleHeight = maxTriangleHeight(red, blue);
  const maxBlueTriangleHeight = maxTriangleHeight(blue, red);

  return Math.max(maxRedTriangleHeight, maxBlueTriangleHeight);
};
