const app = require('./app');
const { port } = require('./config');
const fetchData = require('./lib/fetchData');

app.listen(port, async () => {
  // I'm fetchin all the data with the application launch. If it was a normal application that kind
  // of fetching could be implementing by cron, or other scheduled job (like every day or week)
  await fetchData({});
  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${port} port`);
});
