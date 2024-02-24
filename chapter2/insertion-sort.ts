import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";
import { Items } from "../helpers/Items.ts";

// 0番目からi-1番目まではソート済み、i番目からn-1番目までは未ソート
// i番目の項目を0番目からi-1番目までの適切な位置に挿入する
export const insertionSort = (items: Items): Items => {
  for (let i = 0; i < items.length; i++) {
    const x = items[i];
    let j = i;
    // x（i番目の項目）を、ソート済みの配列の適切な位置に挿入する
    // xは、ソート済み配列の中で、自分より小さい項目の右隣に挿入される
    // ソート済みの配列の一番左の項目（インデックスはj-1）から順に、xがその項目より小さいかどうかを調べてゆく
    while (j > 0 && x < items[j - 1]) {
      // xよりもその項目が大きい場合は、その項目を右に1つずらす
      items[j] = items[j - 1];
      j--;
    }
    // xよりもその項目が小さいか等しい場合は、xをその項目の右隣（インデックスがj-1の項目の右隣なので、インデックスはj）に挿入する
    // 左端まで探索してもxよりも小さい項目がなかった場合は、xを左端（インデックスは0）に挿入する
    items[j] = x;
  }
  return items;
};

Deno.test("insertionSort", () => {
  const items = [5, 3, 4, 1, 2];
  const sortedItems = insertionSort(items);
  assertEquals(sortedItems, [1, 2, 3, 4, 5]);
});

Deno.test("insertionSort (large items)", () => {
  const items = Array.from({ length: 100000 }, () =>
    Math.floor(Math.random() * 100000)
  );
  const sortedItems = insertionSort([...items]);
  assertEquals(
    sortedItems,
    items.sort((a, b) => a - b)
  );
});
