const webpack = require('webpack');
const path = require("path");

module.exports = {
  context: path.join(__dirname, "src"),
  entry: './index.tsx',
  output: {
    path: __dirname+'/dist/scripts/',
    filename: "testwebpackkarma.min.js",
    libraryTarget: "amd"
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx', '']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      }
    ]
  },
 externals: [{
        "q": true,
        "react": true,
        "react-dom": true
    },
        /^TFS\//, // Ignore TFS/* since they are coming from VSTS host 
        /^VSS\//  // Ignore VSS/* since they are coming from VSTS host
    ]
}