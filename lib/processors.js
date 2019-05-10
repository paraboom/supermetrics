const format = require('date-fns/format');
const groupBy = require('lodash.groupby');

const getAvgValue = arr => arr.reduce((prevSum, item) => {
  const sum = prevSum + item;
  return sum;
}, 0) / arr.length;

const groupByPeriod = (data, dateFormat) => (
  groupBy(data, item => format(new Date(item.created_time), dateFormat))
);

const processGroup = (obj, processFn) => Object.keys(obj).reduce((acc, key) => {
  acc[key] = processFn(obj[key]);
  return acc;
}, {});

module.exports = {
  // Average character length / post / month
  avgPostLenPerMonth: data => processGroup(
    groupByPeriod(data, 'MM/YYYY'),
    group => ({
      avgPostLenPerMonth: getAvgValue(group.map(p => p.messageLength)),
    }),
  ),
  // Longest post by character length / month
  longestPostPerMonth: data => processGroup(
    groupByPeriod(data, 'MM/YYYY'),
    group => ({
      longestPostPerMonth: Math.max.apply(null, group.map(post => post.messageLength)),
    }),
  ),
  // Total posts split by week
  totalPostsByWeek: data => processGroup(
    groupByPeriod(data, 'W/YYYY'),
    group => ({
      totalPostsByWeek: group.length,
    }),
  ),
  // Average number of posts per user / month
  avgPostsPerUserPerMonth: data => processGroup(
    groupByPeriod(data, 'MM/YYYY'),
    (group) => {
      const monthUsers = groupBy(group, 'from_id');
      const users = Object.keys(monthUsers).map(userId => monthUsers[userId].length);
      return {
        avgPostsPerUserPerMonth: getAvgValue(users),
      };
    },
  ),
};
