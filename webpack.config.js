const path = require('path');

module.exports = {
  mode:'production',
  entry:'./src/index.js',
  output:{
    filename: 'main.js', 
    path: path.resolve(__dirname, 'dist'),
    
  },
  // npm install --save-dev style-loader css-loader
  module:{
    rules:[
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], 
      },
    ]
  },
  devtool: 'inline-source-map',
}