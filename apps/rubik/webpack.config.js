const { name } = require('./package.json')

module.exports = {
  output: {
    library: name,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${name}`,
    globalObject: 'window',
  },
  devServer:{
    proxy: {

      '/query' : 'http://152.32.172.63:8888'
    }
  }
  
}
