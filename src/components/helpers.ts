export function random(min: number, max: number): number {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function delay(ms: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), ms);
  });
}
