const sum = require('../App/utils/Sum')

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});