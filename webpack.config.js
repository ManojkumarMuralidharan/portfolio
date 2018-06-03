// webpack v4
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
  entry: { main: './public/js/templates/client.jsx' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  optimization: {
  	minimizer : [
  		new UglifyJsPlugin({
  			cache : true,
  			parallel: true,
  			uglifyOptions: {
  				compress : true,
  				ecma: 6,
  				mangle: false,
          console: true,
          debugger: true,
          debug: true,
  			},
  			sourceMap : true
  		})
  	]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  }
};
