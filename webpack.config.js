var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname),
  devtool: "inline-sourcemap",
  entry: {
    app: ["./src/app.js"]
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015'],
        plugins: ['react-html-attrs'] //添加组件的插件配置
      }
    }, {
      //下面是使用ant-design的配置文件
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      //下面是使用ant-design的配置文件
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]
    }]
  },
  output: {
    path: __dirname,
    filename: "./dist/bundleApp.js"
  },
  devServer: {
    // contentBase: './dist',
    // hot: true
  },
  plugins: [
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false,
    //   mangle: {
    //     screw_ie8: true,
    //     keep_fnames: true
    //   },
    //   compress: {
    //     screw_ie8: true
    //   },
    //   comments: false
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: false
    }),
  ],
};