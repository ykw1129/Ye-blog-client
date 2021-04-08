function sum (a, b) {
  return a + b
}
test('is a sum', () => {
  expect(sum(1, 2)).toBe(3)
})
