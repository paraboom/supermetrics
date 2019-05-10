/* eslint-disable no-param-reassign */
const axios = require('axios');
const storage = require('../storage');
const withToken = require('../middlewares/withToken');

const fetchPosts = async (page, token = 'wrong') => {
  const { data: { data } } = await axios.get('https://api.supermetrics.com/assignment/posts', {
    params: {
      sl_token: token,
      page,
    },
  });

  return data.posts;
};

// You don't have an endpoint to check the validity of current token, so I have to build this
// construction to handle cases when token is already expired
const fetchPostsWrapper = async (req, page) => {
  try {
    const posts = await fetchPosts(page, req.token);
    return posts;
  } catch (e) {
    const { data } = e.response || {};

    if (data && data.error && data.error.message === 'Invalid SL Token') {
      storage.setByKey('token', null);
      await withToken(req);
      const posts = await fetchPosts(page, req.token);
      return posts;
    }
    throw e;
  }
};

module.exports = async (req) => {
  let page = 1;
  const totalPageCount = 10;
  const requests = [];

  while (page <= totalPageCount) {
    requests.push(fetchPostsWrapper(req, page));
    page += 1;
  }

  const results = await Promise.all(requests);
  const allPosts = results
    .reduce((acc, result) => acc.concat(result), [])
    // here we could calculate some intermediate values
    .map((post) => {
      post.messageLength = post.message.length;
      return post;
    });

  storage.setByKey('allPosts', allPosts);
  return allPosts;
};
