const storage = require('../storage');
const getToken = require('../lib/getToken');

// I created this middleware just to have a convenient way to have token in request
// If we had more endpoint in the app, this would be quite useful
module.exports = async (req, res, next) => {
  let token = storage.getByKey('token');

  if (!token) {
    token = await getToken();
    storage.setByKey('token', token);
  }

  req.token = token;

  if (next) next();
};
