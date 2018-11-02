const chokidar = require('chokidar')
const convert = require('./util/convert')
const p = require('path')
const exec = require('child_process').exec

chokidar.watch('./api').on('all', (event, path) => {
  console.log(event, path)
  if (path.includes('.json')) {
    try {
      convert(p.resolve(__dirname, path))
    } catch (error) {
      console.log(error)
    }
    exec('npm run doc')
  }
})
