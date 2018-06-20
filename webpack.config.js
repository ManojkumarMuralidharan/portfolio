// webpack v4
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
module.exports = env => {
  console.log('env', env);
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
    				mangle: false,
            console: false,
            debugger: false,
            debug: false,
    			},
    			sourceMap : true
    		})
    	]
    },
    plugins:[
      new DotenvPlugin()
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
