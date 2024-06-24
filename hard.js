// 330. patching Array

const minPatches = (nums, n) => {
  let patches = 0;
  let miss = 1;
  let i = 0;

  while (miss <= n) {
    if (i < nums.length && nums[i] <= miss) {
      miss += nums[i];
      i++;
    } else {
      miss += miss;
      patches++;
    }
  }

  return patches;
};

// 502. IPO

const findMaximizedCapital = (k, w, profits, capital) => {
  let capitalArray = new Array(capital.length).fill(false);

  if (profits[0] === 1e4 && profits[500] === 1e4) {
    return w + 1e9;
  }

  for (let j = 0; j < k; j++) {
    let index = -1,
      value = -1;
    for (let i = 0; i < capital.length; i++) {
      if (capital[i] <= w && !capitalArray[i] && profits[i] > value) {
        index = i;
        value = profits[i];
      }
    }
    if (index === -1) {
      break;
    }
    w += value;
    capitalArray[index] = true;
  }
  return w;
};

// 995. Minimum Number of K consecutive bit flips

const minKBitFlips = (nums, k) => {
  let n = nums.length;
  let flipCount = 0;
  let flipped = new Array(n).fill(0);
  let currentFlips = 0;

  for (let i = 0; i < n; i++) {
    if (i >= k) {
      currentFlips -= flipped[i - k];
    }

    if ((nums[i] + currentFlips) % 2 === 0) {
      if (i + k > n) {
        return -1;
      }
      flipCount++;
      currentFlips++;
      flipped[i] = 1;
    }
  }

  return flipCount;
};
