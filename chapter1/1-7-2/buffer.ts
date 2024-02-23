import { Stopwatch } from "../../helpers/stopwatch.ts";

interface IBuffer<T> {
  deposit(value: T): boolean;
  fetch(): T | null;
  show(): void;
}

class Buffer<T> implements IBuffer<T> {
  private queue: T[] = [];
  private size: number;

  constructor(size: number = 10) {
    this.size = size;
  }

  deposit(value: T): boolean {
    if (this.queue.length < this.size) {
      this.queue.push(value);
      return true;
    }
    // バッファが満杯の場合
    return false;
  }

  fetch(): T | null {
    if (this.queue.length > 0) {
      return this.queue.shift()!;
    }
    // バッファが空の場合
    return null;
  }

  show(): void {
    console.log(`Current buffer: ${this.queue}`);
  }
}

class CirclerBuffer<T> implements IBuffer<T> {
  private queue: T[];
  private head = 0;
  private tail = 0;
  private count = 0;

  constructor(private size: number) {
    this.queue = new Array<T>(size);
  }

  deposit(value: T): boolean {
    if (this.count < this.size) {
      this.queue[this.tail] = value;
      // tailを次の位置に進める。tailがバッファの最後の位置に達したら、先頭に戻る。
      this.tail = (this.tail + 1) % this.size;
      this.count++;
      return true;
    }
    return false;
  }

  fetch(): T | null {
    if (this.count > 0) {
      const value = this.queue[this.head];
      this.head = (this.head + 1) % this.size;
      this.count--;
      return value;
    }
    return null;
  }

  show(): void {
    console.log(`Current buffer: ${this.queue}`);
  }
}

const DATA_LENGTH = 10000;

async function producer(buffer: IBuffer<number>) {
  for (let i = 0; i < DATA_LENGTH; i++) {
    while (true) {
      // データを送信できるまでループする
      const isDeposited = buffer.deposit(i);
      //   buffer.show();
      if (isDeposited) {
        console.log(`[Producer] Produced: ${i}`);
        break;
      } else {
        console.log(`[Producer] Buffer is full, waiting...`);
      }
      await new Promise((resolve) => setTimeout(resolve, 100)); // 生産速度
    }
    // 全てのデータを送信したら終了
    if (i === DATA_LENGTH - 1) {
      console.log(`[Producer] All data are produced`);
      return;
    }
  }
}

async function consumer(buffer: IBuffer<number>) {
  while (true) {
    const value = buffer.fetch();
    // buffer.show();
    if (value !== null) {
      console.log(`[Consumer] Consumed: ${value}`);
      if (value === DATA_LENGTH - 1) {
        console.log(`[Consumer] All data are consumed`);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1)); // 消費速度
    } else {
      console.log(`[Consumer] Buffer is empty, waiting...`);
      await new Promise((resolve) => setTimeout(resolve, 1));
    }
  }
}

async function handleBuffer(buffer: IBuffer<number>) {
  const stopwatch = new Stopwatch();
  stopwatch.start();
  try {
    await Promise.all([producer(buffer), consumer(buffer)]);
  } catch (error) {
    console.error(`Error handling buffer: ${error}`);
  }
  stopwatch.stop();
  return stopwatch.getElapsedTime();
}

// const noBuffer = new Buffer<number>(1);
const buffer = new Buffer<number>(10);
const largeBuffer = new Buffer<number>(1000);
const circlerBuffer = new CirclerBuffer<number>(10);
const largeCirclerBuffer = new CirclerBuffer<number>(1000);

const result = await Promise.all([
  // handleBuffer(noBuffer);
  handleBuffer(buffer),
  handleBuffer(largeBuffer),
  handleBuffer(circlerBuffer),
  handleBuffer(largeCirclerBuffer),
]);

const [
  // elapsedTimeNoBuffer,
  elapsedTime,
  elapsedTimeLargeBuffer,
  elapsedTimeCirclerBuffer,
  elapsedTimeLargeCirclerBuffer,
] = result;

// console.log(`Elapsed time (no buffer): ${elapsedTimeNoBuffer}ms`);
console.log(`Elapsed time (buffer size 10): ${elapsedTime}ms`);
console.log(`Elapsed time (buffer size 1000): ${elapsedTimeLargeBuffer}ms`);
console.log(
  `Elapsed time (circle buffer size 10): ${elapsedTimeCirclerBuffer}ms`
);
console.log(
  `Elapsed time (circle buffer size 1000): ${elapsedTimeLargeCirclerBuffer}ms`
);
