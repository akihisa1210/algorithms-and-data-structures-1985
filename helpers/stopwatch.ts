export class Stopwatch {
  private startTime = 0;
  private endTime = 0;

  start(): void {
    this.startTime = Date.now();
  }

  stop(): void {
    this.endTime = Date.now();
  }

  getElapsedTime(): number {
    return this.endTime - this.startTime;
  }
}
