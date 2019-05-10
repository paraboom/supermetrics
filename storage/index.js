const storage = {};

// this is a limitation of DB or some persistance storage
module.exports = {
  getByKey: key => storage[key],
  setByKey: (key, value) => {
    storage[key] = value;
    return value;
  },
};
