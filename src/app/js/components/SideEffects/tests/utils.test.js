import { formatBalance, forEach, sum } from '../../../utils';

 it('renders _formatBalance correctly', () => {
   expect(formatBalance(1.9999999999999999999999999999999)).toMatch('Ξ2.0000');
 });

 //test tests
it('tests mockCallback', () => {
  const mockCallback = jest.fn(x => 42 + x);
 forEach([0, 1], mockCallback);

 // The mock function is called twice
 expect(mockCallback.mock.calls.length).toBe(2);

 // The first argument of the first call to the function was 0
 expect(mockCallback.mock.calls[0][0]).toBe(0);

 // The first argument of the second call to the function was 1
 expect(mockCallback.mock.calls[1][0]).toBe(1);

 // The return value of the first call to the function was 42
 expect(mockCallback.mock.results[0].value).toBe(42);
});

it('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
