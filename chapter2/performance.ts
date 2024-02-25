import { Stopwatch } from "../helpers/stopwatch.ts";
import { Items } from "../helpers/Items.ts";
import { insertionSort } from "./insertion-sort.ts";
import { binaryInsertionSort } from "./binary-insertion-sort.ts";
import { selectionSort } from "./selection-sort.ts";

// 性能計測用のメソッド
const measurePerformance = (
  fn: (items: Items) => Items,
  items: Items
): void => {
  // 元のitemsがソートされないように、itemsをコピーする
  const itemsCopy = [...items];
  const sw = new Stopwatch();
  sw.start();
  fn(itemsCopy);
  sw.stop();
  console.log(fn.name, sw.getElapsedTime());
};

const items = Array.from({ length: 100000 }, () =>
  Math.floor(Math.random() * 100000)
);

measurePerformance(insertionSort, items);
measurePerformance(binaryInsertionSort, items);
measurePerformance(selectionSort, items);
