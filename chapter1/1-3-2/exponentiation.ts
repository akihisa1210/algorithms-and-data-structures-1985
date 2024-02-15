import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";

// iは0より大きい整数
const exp = (x: number, n: number): number => {
  let y = 1.0;

  while (n > 0) {
    console.log(n);
    if (n % 2 !== 0) {
      y = y * x;
    } else {
      (x = x * x), (n = Math.floor(n / 2));
    }
  }
  return y;
};

Deno.test("exp", () => {
  assertEquals(exp(1, 1), 1);
  assertEquals(exp(1, 2), 1);

  assertEquals(exp(2, 1), 2);
  assertEquals(exp(2, 2), 4);
  assertEquals(exp(2, 3), 8);

  assertEquals(exp(1.5, 2), 2.25);
});
