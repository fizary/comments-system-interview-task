export function delay(delay) {
  return (req, res, next) => setTimeout(next, delay);
}
