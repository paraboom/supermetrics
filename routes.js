const express = require('express');
const withToken = require('./middlewares/withToken');
const fetchData = require('./lib/fetchData');
const storage = require('./storage');
const processors = require('./lib/processors');

const router = express.Router();

// I thought that it'd be nice to be able to refetch all the data
router.get('/refetch', withToken, async (req, res) => {
  const posts = await fetchData(req);
  res.send({ posts });
});

// This endpoint should be called with specific metric for calculation
// - avgPostLenPerMonth - Average character length / post / month
// - longestPostPerMonth - Longest post by character length / month
// - totalPostsByWeek - Total posts split by week
// - avgPostsPerUserPerMonth - Average number of posts per user / month
// all calculations perform without any cache strategy, in real-world application intermediate
// results should be properly cached
router.get('/stats', async (req, res) => {
  const { metric } = req.query;

  try {
    const allPosts = storage.getByKey('allPosts');

    const processor = processors[metric];

    if (!processor) {
      throw new Error('Specified metric doesn\'t exist');
    }

    const result = processor(allPosts);

    res.send({ result });
  } catch (e) {
    res.status(500);
    res.send({
      error: e.message || 'Something bad happened',
    });
  }
});

module.exports = router;
