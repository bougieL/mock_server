const router = require('express').Router()
const mock = require('mockjs').mock
/**
 * @api {get} /example// 使用示例
 * @apiGroup example
 * @apiParam {Number} id 用户id
 * @apiSuccess {Object} micoin 金币对象
 * @apiSuccess {Number} micoin.cur_coin 当前金币
 * @apiSuccess {Number} micoin.last_coin 剩余金币
 * @apiSuccess {Array} micoin_record 金币记录
 * @apiSuccess {String} micoin_record.show_str 金币操作
 * @apiSuccess {String} micoin_record.time_str 时间
 * @apiSuccess {Number} micoin_record.number 金币数量
 * @apiSuccess {Object} prize_record 兑换记录
 * @apiSuccess {String} prize_record.img 商品图片链接
 * @apiSuccess {String} prize_record.time_str 兑换时间
 * @apiSuccess {String} prize_record.name 产品名称
 * @apiSampleRequest http://localhost:3000/example//
 * @apiVersion 1.0.0
 */
router.get('//', function (req, res, next) {
  let _jsonpcallback = req.query.jsonpcallback
  if (_jsonpcallback) {
    res.type('text/javascript')
    res.send(_jsonpcallback + '(' + JSON.stringify(mock({"message":"ok","code":0,"data":{"userName":"@cname()","userId":"@id()","birthDate":"@date('yyyy-MM-dd')","avatar":"@image(100x100, #3399ff)","sign":"@csentence()","age|1-100":100,"record|1-20":[{"method":"@pick('Check-in', 'Lucky Draw', 'Exchange', 'Official reward')","time":"@datetime()"}]}})) + ')')
  } else {
    res.json(mock({"message":"ok","code":0,"data":{"userName":"@cname()","userId":"@id()","birthDate":"@date('yyyy-MM-dd')","avatar":"@image(100x100, #3399ff)","sign":"@csentence()","age|1-100":100,"record|1-20":[{"method":"@pick('Check-in', 'Lucky Draw', 'Exchange', 'Official reward')","time":"@datetime()"}]}}))
  }
})

module.exports = router
