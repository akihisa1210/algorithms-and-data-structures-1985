import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";

type Key = number;
type Items = Key[];

// Itemは昇順でソートされている必要がある
const binarySearch = (items: Items, target: Key): number => {
  let low = 0;
  let high = items.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (items[mid] === target) {
      return mid;
    }
    if (items[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return -1;
};

// 終了条件をシンプルにすることで性能を改善する
// もし答えがあるなら、その値はlowとhighの間に含まれる
// そこで、lowとhighが隣り合うまでループを繰り返す
const binarySearchImproved = (items: Items, target: Key): number => {
  let low = 0;
  let high = items.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (items[mid] < target) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  if (items[high] === target) {
    return high;
  } else {
    return -1;
  }
};

Deno.test("key exists", () => {
  assertEquals(binarySearch([1, 2, 3, 4, 5], 3), 2);
});

Deno.test("key does not exist", () => {
  assertEquals(binarySearch([1, 2, 3, 4, 5], 6), -1);
});

Deno.test("key exists (improved)", () => {
  assertEquals(binarySearchImproved([1, 2, 3, 4, 5], 3), 2);
});

Deno.test("key does not exist (improved)", () => {
  assertEquals(binarySearchImproved([1, 2, 3, 4, 5], 6), -1);
});
