import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";

const exp = (x: number, n: number): number => {
  // 指数計算のアルゴリズム。xのn乗を計算する。
  // 指数が2の冪乗の場合、計算量がO(log n)になる。そこで、どのような指数の場合でも、指数を2の累乗の積に分解する。
  // 例えば、3^5 = (3^4)*1 * (3^2)*0 * (3^1)*1 = 3^4 * 3^1 = 81 * 3 = 243
  // 以下の実装では、xの（2の累乗）乗を順番に計算しつつ、回答にその数が含まれる場合にはyにその数を掛けていく。
  let y = 1.0;
  while (n > 0) {
    if (n % 2 !== 0) {
      y = y * x;
    }
    x = x * x;
    n = Math.floor(n / 2);
  }
  return y;
};

Deno.test("n is power of 2 (n > 0)", () => {
  assertEquals(exp(3, 1), 3);
  assertEquals(exp(3, 2), 9);
  assertEquals(exp(3, 4), 81);
  assertEquals(exp(3, 8), 6561);
  assertEquals(exp(2, 4), 16);
});

Deno.test("n is not power of 2 (n > 0)", () => {
  assertEquals(exp(3, 3), 27);
  assertEquals(exp(3, 5), 243);
  assertEquals(exp(3, 7), 2187);
});

Deno.test("n is large", () => {
  assertEquals(exp(2, 30), 1073741824);
});
