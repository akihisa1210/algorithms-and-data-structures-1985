import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";
import { Items } from "../helpers/Items.ts";

// 0番目からi-1番目まではソート済み、i番目からn-1番目までは未ソート
// 未ソートの項目の最小値をソート済み配列の末尾に追加する
export const selectionSort = (items: Items): Items => {
  const n = items.length;
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    for (let j = i; j < n; j++) {
      if (items[j] < items[minIndex]) {
        minIndex = j;
      }
    }
    // i番目の要素を、未ソートの部分の最小値と交換する
    [items[i], items[minIndex]] = [items[minIndex], items[i]];
  }
  return items;
};

// ある意味で、選択ソートは挿入ソートの逆だといえる
// なぜなら、挿入ソートは未ソート配列の先頭の要素をソート済み配列全体のうち適切な部分に挿入するのに対して、
// 選択ソートは未ソート配列全体から最小値を探索してソート済み配列の末尾に追加するため

Deno.test("selectionSort", () => {
  const items = [
    39, 97, 72, 8, 23, 58, 91, 65, 32, 18, 55, 57, 97, 89, 58, 9, 80, 4, 70, 50,
    0, 27, 21, 13, 23, 62, 71, 73, 55, 81, 11, 39, 75, 62, 23, 9, 50, 19, 48,
    24, 24, 82, 43, 86, 77, 10, 60, 77, 53, 24, 23, 3, 23, 31, 3, 30, 88, 64,
    79, 82, 5, 2, 19, 19, 36, 21, 95, 70, 15, 7, 9, 54, 35, 75, 99, 55, 41, 50,
    68, 41, 90, 4, 49, 5, 62, 11, 71, 74, 71, 82, 69, 21, 29, 69, 93, 75, 21,
    27, 87, 46,
  ];
  const sortedItems = selectionSort(items);
  assertEquals(
    sortedItems,
    [
      0, 2, 3, 3, 4, 4, 5, 5, 7, 8, 9, 9, 9, 10, 11, 11, 13, 15, 18, 19, 19, 19,
      21, 21, 21, 21, 23, 23, 23, 23, 23, 24, 24, 24, 27, 27, 29, 30, 31, 32,
      35, 36, 39, 39, 41, 41, 43, 46, 48, 49, 50, 50, 50, 53, 54, 55, 55, 55,
      57, 58, 58, 60, 62, 62, 62, 64, 65, 68, 69, 69, 70, 70, 71, 71, 71, 72,
      73, 74, 75, 75, 75, 77, 77, 79, 80, 81, 82, 82, 82, 86, 87, 88, 89, 90,
      91, 93, 95, 97, 97, 99,
    ]
  );
});
