const test = require('ava');
const processors = require('../lib/processors');
const data = require('./data.json');

test('Average character length / post / month', (t) => {
  const { avgPostLenPerMonth } = processors;
  const result = avgPostLenPerMonth(data);
  t.assert(result['05/2019']);
  t.assert(result['04/2019']);
  t.assert(result['03/2019']);
  t.is(result['05/2019'].avgPostLenPerMonth, 459);
  t.is(result['04/2019'].avgPostLenPerMonth, 234);
  t.is(result['03/2019'].avgPostLenPerMonth, 49);
});

test('Longest post by character length / month', (t) => {
  const { longestPostPerMonth } = processors;
  const result = longestPostPerMonth(data);
  t.assert(result['05/2019']);
  t.assert(result['04/2019']);
  t.assert(result['03/2019']);
  t.is(result['05/2019'].longestPostPerMonth, 678);
  t.is(result['04/2019'].longestPostPerMonth, 234);
  t.is(result['03/2019'].longestPostPerMonth, 49);
});

test('Total posts split by week', (t) => {
  const { totalPostsByWeek } = processors;
  const result = totalPostsByWeek(data);
  t.assert(result['19/2019']);
  t.assert(result['15/2019']);
  t.assert(result['10/2019']);
  t.is(result['19/2019'].totalPostsByWeek, 3);
  t.is(result['15/2019'].totalPostsByWeek, 1);
  t.is(result['10/2019'].totalPostsByWeek, 1);
});

test('Average number of posts per user / month', (t) => {
  const { avgPostsPerUserPerMonth } = processors;
  const result = avgPostsPerUserPerMonth(data);
  t.assert(result['05/2019']);
  t.assert(result['04/2019']);
  t.assert(result['03/2019']);
  t.is(result['05/2019'].avgPostsPerUserPerMonth, 1.5);
  t.is(result['04/2019'].avgPostsPerUserPerMonth, 1);
  t.is(result['03/2019'].avgPostsPerUserPerMonth, 1);
});
