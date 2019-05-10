const axios = require('axios');
const { clientId, name, email } = require('../config');

module.exports = async () => {
  const { data } = await axios.post(
    'https://api.supermetrics.com/assignment/register', {
      client_id: clientId,
      name,
      email,
    },
  );

  const { data: { sl_token: token } } = data;

  return token;
};
