var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client');
var STYLE_DIR = path.resolve(__dirname, 'src/stylesheets');

var config = {
  entry: [
    //'webpack-dev-server/client?http://localhost:8080',
    //'webpack/hot/only-dev-server',
    APP_DIR + '/index.jsx'
  ],
  output: {
    path: BUILD_DIR,
    publicPath: '/public/',
    filename: 'bundle.js'
  },

  module : {
  	loaders : [
  		{
  			test : /\.jsx?/,
  			include : APP_DIR,
  			loaders : ['react-hot','babel?presets[]=es2015&presets[]=react']        
  		},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel-loader"]
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: STYLE_DIR
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
        //loaders: [ 'style', 'css?sourceMap', 'sass?sourceMap', ExtractTextPlugin.extract('css!sass') ]
      }
  	]
  },
  resolve: {
    extension: ['','.js','.jsx']
  },
 
  plugins: [  
    //new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]

};

module.exports = config;