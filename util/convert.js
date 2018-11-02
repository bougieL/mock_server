const fs = require('fs')
const { port } = require('../config.json')
const p = (...pa) => require('path').resolve(...pa)

function addRouter (routerItem, prefix) {
  let { name, url, reqField, reqExample, res, jsonp, resField, method } = routerItem
  res = JSON.stringify(res)
  let params = ''
  if (reqField) {
    reqField.forEach(v => {
      params += ` * @apiParam ${v}\n`
    })
  }
  let filedDesc = ''
  if (resField) {
    resField.forEach(v => {
      filedDesc += ` * @apiSuccess ${v}\n`
    })
  }
  let reqExampleText = ''
  if (reqExample) {
    reqExampleText = ` * @reqExample ${reqExample}\n`
  }
  let router = ''
  let apiSampleRequest = `http://localhost:${port}/${prefix}/${url}`
  if (jsonp) {
    router = `router.${method}('/${url}', function (req, res, next) {
  let _jsonpcallback = req.query.${jsonp}
  if (_jsonpcallback) {
    res.type('text/javascript')
    res.send(_jsonpcallback + '(' + JSON.stringify(mock(${res})) + ')')
  } else {
    res.json(mock(${res}))
  }
})\n\n`
    // apiSampleRequest = `http://localhost:${port}/${prefix}/${url}?jsonpcallback=jsonp`
  } else {
    router = `router.${method}('/${url}', function (req, res, next) {
  res.json(mock(${res}))
})\n\n`
    // apiSampleRequest = `http://localhost:${port}/${prefix}/${url}`
  }

  return `/**
 * @api {${method}} /${prefix}/${url} ${name}
 * @apiGroup ${prefix}
${reqExampleText}${params}${filedDesc} * @apiSampleRequest ${apiSampleRequest}
 * @apiVersion 1.0.0
 */
${router}`
}

function routerList () {
  let routerDir = p(__dirname, '..', 'router')
  let apiDir = p(__dirname, '..', 'api')
  let str = (t1, t2) => `${t1}
module.exports = {
${t2}
}
`
  let apiList = fs.readdirSync(apiDir).map(v => v.split('.')[0])
  let t1 = ''
  let t2 = ''
  fs.readdirSync(routerDir).forEach(v => {
    let prefix = v.split('.')[0]
    if (v !== 'index') {
      if (apiList.includes(prefix)) {
        t1 += `const ${prefix} = require('./${prefix}')\n`
        t2 += `  ${prefix},\n`
      } else {
        fs.unlinkSync(p(routerDir, v))
      }
    }
  })
  str = str(t1, t2).replace(/,[\n\s]*\}/, '\n}')
  fs.writeFileSync(p(routerDir, 'index.js'), str)
}

function convert (path) {
  let file = fs.readFileSync(path, 'utf8')
  file = JSON.parse(file)
  let prefix = path.split('/').pop().split('.')[0]
  routerList()
  const strs = {
    header: `const router = require('express').Router()\nconst mock = require('mockjs').mock\n`,
    routers: '',
    footer: `module.exports = router\n`
  }
  file.forEach(v => { strs.routers += addRouter(v, prefix) })
  fs.writeFileSync(p(__dirname, '..', 'router', `${prefix}.js`), strs.header + strs.routers + strs.footer, 'utf8')
}

module.exports = convert
