const path = require('path');

module.exports = {
  entry: './app.js',
  mode: 'production',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname)
  }
};
