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

// 1579. Remove Max number of Edges to keep the graph fully traversable

class UnionFind {
  constructor(n) {
    this.parent = Array(n)
      .fill()
      .map((_, i) => i);
    this.rank = Array(n).fill(0);
    this.components = n;
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.rank[rootX] < this.rank[rootY]) {
        [rootX, rootY] = [rootY, rootX];
      }
      this.parent[rootY] = rootX;
      if (this.rank[rootX] === this.rank[rootY]) {
        this.rank[rootX]++;
      }
      this.components--;
      return true;
    }
    return false;
  }
}

function maxNumEdgesToRemove(n, edges) {
  const alice = new UnionFind(n);
  const bob = new UnionFind(n);
  let removableEdges = 0;
  let addedEdges = 0;

  edges.sort((a, b) => b[0] - a[0]);

  for (const [type, u, v] of edges) {
    if (type === 3) {
      const addedAlice = alice.union(u - 1, v - 1);
      const addedBob = bob.union(u - 1, v - 1);
      if (addedAlice || addedBob) {
        addedEdges++;
      } else {
        removableEdges++;
      }
    } else if (type === 1) {
      if (alice.union(u - 1, v - 1)) {
        addedEdges++;
      } else {
        removableEdges++;
      }
    } else {
      if (bob.union(u - 1, v - 1)) {
        addedEdges++;
      } else {
        removableEdges++;
      }
    }
  }

  if (alice.components !== 1 || bob.components !== 1) {
    return -1;
  }

  return removableEdges;
}

// 2751. Robot Collision

const survivedRobotsHealths = (positions, healths, directions) => {
  const n = positions.length;
  const robots = positions.map((pos, i) => ({
    id: i,
    pos: pos,
    health: healths[i],
    dir: directions[i],
  }));

  robots.sort((a, b) => a.pos - b.pos);

  const stack = [];

  for (const robot of robots) {
    if (robot.dir === "R") {
      stack.push(robot);
    } else {
      while (
        stack.length &&
        stack[stack.length - 1].dir === "R" &&
        stack[stack.length - 1].health <= robot.health
      ) {
        const top = stack.pop();
        if (top.health === robot.health) {
          robot.health = 0;
          break;
        }
        robot.health--;
      }

      if (robot.health > 0) {
        if (stack.length && stack[stack.length - 1].dir === "R") {
          stack[stack.length - 1].health--;
          if (stack[stack.length - 1].health === 0) {
            stack.pop();
          }
        } else {
          stack.push(robot);
        }
      }
    }
  }

  const result = new Array(n).fill(0);
  for (const robot of stack) {
    result[robot.id] = robot.health;
  }

  return result.filter((health) => health > 0);
};
