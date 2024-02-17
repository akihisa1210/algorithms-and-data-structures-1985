import { assertEquals } from "https://deno.land/std@0.83.0/testing/asserts.ts";

const exp_for_power_of_2 = (x: number, n: number): number => {
  if (n === 1) {
    return x;
  }
  while (n > 1) {
    x = x * x;
    n = Math.floor(n / 2);
  }
  return x;
};

const exp = (x: number, n: number): number => {
  let y = 1.0;
  let binaryDigitPosition = 1;
  while (n > 0) {
    console.log(`y = ${y}, x = ${x}, n = ${n}`);
    if (n % 2 !== 0) {
      console.log(
        `余りが1なので計算する: x=${x}, binaryDigitPosition=${binaryDigitPosition}`
      );
      y = y * exp_for_power_of_2(x, 2 ** (binaryDigitPosition - 1));
    }
    binaryDigitPosition++;
    n = Math.floor(n / 2);
  }
  console.log(`answer = ${y}`);
  return y;
};

Deno.test("exp_for_power_of_2", () => {
  assertEquals(exp_for_power_of_2(3, 1), 3);
  assertEquals(exp_for_power_of_2(3, 2), 9);
  assertEquals(exp_for_power_of_2(3, 4), 81);
  assertEquals(exp_for_power_of_2(3, 8), 6561);
  assertEquals(exp_for_power_of_2(2, 4), 16);
});

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
