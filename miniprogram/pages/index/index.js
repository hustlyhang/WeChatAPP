// index.js

const {
  SSL_OP_SSLEAY_080_CLIENT_DH_BUG
} = require("constants")

// 获取应用实例
const app = getApp()

Page({
  data: {
    flg1: 1,
    flg2: 1,
    querytext: '',
    toView: 'green',
    query1: '查询昨日经营数据',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  on_query1_btn_click() {
    // 获取数据
    console.log("点击查询")
    wx.cloud.callFunction({
      name: 'getData',
      data: {
        url:'http://47.108.248.22:8080/api/getData/'
      },
      success: (res) => {
        console.log(res.result)
        this.setData({
          querytext: JSON.parse(res.result)
        })
        wx.setClipboardData({
          data: this.data.querytext
        })
      }
    })
    // 复制
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})