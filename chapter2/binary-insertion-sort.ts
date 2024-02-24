import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";
import { Items } from "../helpers/Items.ts";

// 0番目からi-1番目まではソート済み、i番目からn-1番目までは未ソート
// i番目の項目を0番目からi-1番目までの適切な位置に挿入する
const binaryInsertionSort = (items: Items): Items => {
  for (let i = 0; i < items.length; i++) {
    const x = items[i];
    // x（i番目の項目）を、ソート済みの配列の適切な位置に挿入する
    // その際に、バイナリサーチを使って適切な位置を探す
    let low = 0;
    let high = i;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (items[mid] <= x) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    for (let j = i; j > high; j--) {
      items[j] = items[j - 1];
    }
    items[high] = x;
  }
  return items;
};

Deno.test("binaryInsertionSort", () => {
  const items = [5, 3, 4, 1, 2];
  const sortedItems = binaryInsertionSort(items);
  assertEquals(sortedItems, [1, 2, 3, 4, 5]);
});
