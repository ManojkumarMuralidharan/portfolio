// webpack v4
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');
module.exports = env => {
  return {
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
    				mangle: true,
            console: false,
            debugger: false,
            debug: false,
    			},
    			sourceMap : false
    		})
    	]
    },
    plugins:[
      new DotenvPlugin(),
      new LodashModuleReplacementPlugin({
        'collections': true,
        'paths': true
      })
    ],
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
        },
        {
         test: /\.css$/,
         use: [ 'style-loader', 'css-loader' ]
       }
      ]
    }
  };
}
