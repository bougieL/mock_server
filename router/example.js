const router = require('express').Router()
const mock = require('mockjs').mock
/**
 * @api {get} /example/ 使用示例
 * @apiGroup example
 * @apiParam {String} userId 用户id
 * @apiSuccess {String} userName 用户名
 * @apiSuccess {String} userId 用户id
 * @apiSuccess {String} birthDate 用户生日
 * @apiSuccess {String} avatar 用户头像
 * @apiSuccess {Number} age 用户年龄
 * @apiSuccess {Array} record 兑换记录
 * @apiSuccess {String} record.name 商品名称
 * @apiSuccess {String} record.method 兑换方式
 * @apiSuccess {String} record.time 兑换时间
 * @apiSampleRequest http://localhost:3000/example/
 * @apiVersion 1.0.0
 */
router.get('/', function (req, res, next) {
  let _jsonpcallback = req.query.jsonpcallback
  if (_jsonpcallback) {
    res.type('text/javascript')
    res.send(_jsonpcallback + '(' + JSON.stringify(mock({"message":"ok","code":0,"data":{"userName":"@cname()","userId":"@id()","birthDate":"@date('yyyy-MM-dd')","avatar":"@image(100x100, #3399ff)","sign":"@csentence()","age|1-100":100,"record|1-20":[{"name":"@pick('IPhone X', 'IPhone XS', 'Macbook Pro')","method":"@pick('Check-in', 'Lucky Draw', 'Exchange', 'Official reward')","time":"@datetime()"}]}})) + ')')
  } else {
    res.json(mock({"message":"ok","code":0,"data":{"userName":"@cname()","userId":"@id()","birthDate":"@date('yyyy-MM-dd')","avatar":"@image(100x100, #3399ff)","sign":"@csentence()","age|1-100":100,"record|1-20":[{"name":"@pick('IPhone X', 'IPhone XS', 'Macbook Pro')","method":"@pick('Check-in', 'Lucky Draw', 'Exchange', 'Official reward')","time":"@datetime()"}]}}))
  }
})

module.exports = router
