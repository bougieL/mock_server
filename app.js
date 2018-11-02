const express = require('express')
const cors = require('./util/cors')
const routers = require('./router/index')
const { port } = require('./config.json')
const app = express()

app.use(cors)

app.use(express.static('public'))

Object.keys(routers).forEach(v => {
  app.use(`/${v}`, routers[v])
})

app.listen(port, function () {
  console.log(`应用实例，访问地址为 http://localhost:${port}`)
})
