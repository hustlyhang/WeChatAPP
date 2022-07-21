// 云函数入口文件

const cloud = require('wx-server-sdk')

cloud.init()
var rp = require('request-promise')
// 云函数入口函数
exports.main = async (event, context) => {
  // console.log(event);
  let url = event.url + event.flg;
  return await rp({
      url: url,
      method: "GET"
    })
    .then(function (res) {
      return res
    })
    .catch(function (err) {
      return '请求失败'
    });
}