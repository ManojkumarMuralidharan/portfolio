// webpack v4
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = env => {
  return {
    entry: { main: './public/js/templates/client.jsx' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].bundle.js',
      filename: 'main.js'
    },
    externals: {

    },
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      },
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
      new DotenvPlugin({
      path: path.resolve(__dirname, '.env')
    }),
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
