var webpack = require('webpack');
var path = require('path');

process.env.NODE_ENV = 'test'                                                                                                                                                                         

module.exports = {
  resolve: {
    root: path.resolve(__dirname, 'src'),
    alias: {
      components: path.join(__dirname, '../src', 'components'),
      actions: path.join(__dirname, '../src', 'actions'),
      reducers: path.join(__dirname, '../src', 'reducers'),
      reduxFiles: path.join(__dirname, '../src', 'redux-files'),
      config: path.join(__dirname, '../src', 'config'),
      helpers: path.join(__dirname, '../src', 'helpers'),
      images: path.join(__dirname, '../src', 'images'),
      'react': path.resolve(__dirname, '../node_modules', 'react'),
     'react-native': 'react-native-web'
    },
    extensions: ['', '.js', '.jsx']
  },
    
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]  
};
