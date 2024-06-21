// 2. Add Two numbers

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

var addTwoNumbers = function (l1, l2) {
  let dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0;

  while (l1 !== null || l2 !== null) {
    let x = l1 !== null ? l1.val : 0;
    let y = l2 !== null ? l2.val : 0;
    let sum = carry + x + y;
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
    if (l1 !== null) l1 = l1.next;
    if (l2 !== null) l2 = l2.next;
  }

  if (carry > 0) {
    current.next = new ListNode(carry);
  }

  return dummyHead.next;
};

let l1 = new ListNode(1);
l1.next = new ListNode(2);
l1.next.next = new ListNode(3);
let l2 = new ListNode(3);
l2.next = new ListNode(1);
l2.next.next = new ListNode(2);
let result = addTwoNumbers(l1, l2);
let output = [];
while (result !== null) {
  output.push(result.val);
  result = result.next;
}

// 75. Sort Colors
const sortColors = (nums) => {
  // return nums.sort((a, b) => a - b);
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
};

// 523. Continuous Subarray Sum

const checkSubarraySum = (nums, k) => {
  const map = new Map();
  map.set(0, -1);
  let runningSum = 0;

  for (let i = 0; i < nums.length; i++) {
    runningSum += nums[i];
    let remainder = runningSum % k;

    if (remainder < 0) remainder += k;

    if (map.has(remainder)) {
      if (i - map.get(remainder) >= 2) {
        return true;
      }
    } else {
      map.set(remainder, i);
    }
  }

  return false;
};

// 633. Sum of Square Numbers

const judgeSquareSum = (c) => {
  let a = 0;
  let b = Math.floor(Math.sqrt(c));

  while (a <= b) {
    let squareSum = a * a + b * b;
    if (squareSum === c) {
      return true;
    } else if (squareSum < c) {
      a++;
    } else {
      b--;
    }
  }
  return false;
};

// 648. Replace Words

const replaceWords = (dictionary, sentence) => {
  const words = sentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    for (let root of dictionary) {
      if (words[i].startsWith(root)) {
        words[i] = root;
      }
    }
  }
  return words.join(" ");
};

// 826. Most Profit Assigning Work.

const maxProfitAssignment = (difficulty, profit, worker) => {
  let maxProfit = 0;
  let currentProfit = 0;
  let jobIndex = 0;
  let jobs = [];
  for (let i = 0; i < difficulty.length; i++) {
    jobs.push([difficulty[i], profit[i]]);
  }
  jobs.sort((a, b) => a[0] - b[0]);
  worker.sort((a, b) => a - b);
  for (let i = 0; i < worker.length; i++) {
    while (jobIndex < worker.length && worker[i] >= jobs[jobIndex][0]) {
      currentProfit = Math.max(currentProfit, jobs[jobIndex][1]);
      jobIndex++;
    }
    maxProfit += currentProfit;
  }
  return maxProfit;
};

// 846. Hand of Straights

const isNStraightHand = (hand, groupSize) => {
  const freqMap = new Map();
  hand.sort((a, b) => a - b);

  for (const card of hand) {
    freqMap.set(card, (freqMap.get(card) || 0) + 1);
  }

  if (hand.length % groupSize !== 0) {
    return false;
  }

  for (const [card, freq] of freqMap) {
    if (freq > 0) {
      for (let i = 0; i < groupSize; i++) {
        const nextCard = card + i;
        if (!freqMap.has(nextCard) || freqMap.get(nextCard) < freq) {
          return false;
        }
        freqMap.set(nextCard, freqMap.get(nextCard) - freq);
      }
    }
  }
  return true;
};

// 945. Minimum Increment to Make Array Unique

const minIncrementForUnique = (nums) => {
  let moves = 0;
  let n = nums.length;
  if (n <= 1) return 0;
  nums.sort((a, b) => a - b);
  for (let i = 1; i < n; i++) {
    if (nums[i] <= nums[i - 1]) {
      let increment = nums[i - 1] - nums[i] + 1;
      nums[i] += increment;
      moves += increment;
    }
  }
  return moves;
};

// 974. Subarray Divisible by k

const subarrayDivByK = (nums, k) => {
  let count = 0;
  let prefixSum = 0;
  let reminderCount = new Map();
  reminderCount.set(0, 1);
  for (let num of nums) {
    prefixSum += num;
    let remainder = ((prefixSum % k) + k) % k;
    if (reminderCount.has(remainder)) {
      count += reminderCount.get(remainder);
    }
    reminderCount.set(remainder, (reminderCount.get(remainder) || 0) + 1);
  }
  return count;
};

// 1052. Grumpy bookstore Owner

const maxSatisfied = (customers, grumpy, minutes) => {
  let totalSatisfied = 0;
  for (let i = 0; i < customers.length; i++) {
    if (!grumpy[i]) {
      totalSatisfied += customers[i];
    }
  }

  let additionalSatisfied = 0;
  for (let i = 0; i < minutes; i++) {
    if (grumpy[i]) {
      additionalSatisfied += customers[i];
    }
  }

  let maxAdditionalSatisfied = additionalSatisfied;
  for (let i = minutes; i < customers.length; i++) {
    if (grumpy[i]) {
      additionalSatisfied += customers[i];
    }
    if (grumpy[i - minutes]) {
      additionalSatisfied -= customers[i - minutes];
    }
    maxAdditionalSatisfied = Math.max(
      maxAdditionalSatisfied,
      additionalSatisfied
    );
  }

  return totalSatisfied + maxAdditionalSatisfied;
};

// 1482. Minimum Number of Days to make m Bouquets

const minDays = (bloomDay, m, k) => {
  if (m * k > bloomDay.length) {
    return -1;
  }

  const canMakeBouquets = (days) => {
    let bouquets = 0;
    let flowers = 0;

    for (let bloom of bloomDay) {
      if (bloom <= days) {
        flowers++;
        if (flowers == k) {
          bouquets++;
          flowers = 0;
        }
      } else {
        flowers = 0;
      }
    }

    return bouquets >= m;
  };

  let left = Math.min(...bloomDay);
  let right = Math.max(...bloomDay);

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    if (canMakeBouquets(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
};

// 1552. Magnetic force between two balls
const canPlaceBalls = (position, m, minDistance) => {
  let count = 1;
  let lastPosition = position[0];

  for (let i = 1; i < position.length; i++) {
    if (position[i] - lastPosition >= minDistance) {
      count++;
      lastPosition = position[i];
      if (count >= m) return true;
    }
  }

  return false;
};

const maxDistance = (position, m) => {
  position.sort((a, b) => a - b);

  let left = 1;
  let right = position[position.length - 1] - position[0];
  let result = 0;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);

    if (canPlaceBalls(position, m, mid)) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
};

// 2486. Append Characters to strinng to make subsequence

const appendCharacters = (s, t) => {
  let j = 0;
  for (i = 0; i < s.length; i++) {
    if (s[i] === t[j]) {
      j++;
    }
  }
  return t.length - j;
};
