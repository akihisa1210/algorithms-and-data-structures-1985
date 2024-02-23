import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";

type Key = number;
type Items = Key[];

const search = (items: Items, target: number): number => {
  let i = 0;
  const n = items.length;
  while (i < n && items[i] !== target) {
    i++;
  }
  return i;
};

// 配列の最後に条件とマッチする項目（番兵）を追加することで、ループの終了条件を1つ減らすことができる。
const searchWithSentinel = (items: Items, target: number): number => {
  const itemsWithSentinel = [...items, target];
  let i = 0;
  while (itemsWithSentinel[i] !== target) {
    i++;
  }
  return i;
};

Deno.test("key exists (search)", () => {
  assertEquals(search([1, 2, 3, 4, 5], 3), 2);
});

Deno.test("key does not exist (search)", () => {
  assertEquals(search([1, 2, 3, 4, 5], 6), 5);
});

Deno.test("key exists (searchWithSentinel)", () => {
  assertEquals(searchWithSentinel([1, 2, 3, 4, 5], 3), 2);
});

Deno.test("key does not exist (searchWithSentinel)", () => {
  assertEquals(searchWithSentinel([1, 2, 3, 4, 5], 6), 5);
});
