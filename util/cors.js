module.exports = function (req, res, next) {
  // 自定义中间件，设置跨域需要的响应头。
  res.header('Access-Control-Allow-Origin', '*')
  next()
}
