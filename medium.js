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

let nums1 = [4, 5, 0, -2, -3, 1];
let k1 = 5;
console.log(subarrayDivByK(nums1, k1));

const nums2 = [23, 2, 4, 6, 7];
const k2 = 6;
console.log(subarrayDivByK(nums2, k2));

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
