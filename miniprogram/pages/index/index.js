// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    flg: 1,
    flg1: 0,
    flg2: 0,
    querytext: '',
    toView: 'green',
    query1: '查询',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    value1: 'SUM',
    name1: '月总收入',
    checked1: false,
    items: [{
        value: 'FST',
        name: '区域1',
        checked: true
      },
      {
        value: 'SED',
        name: '区域2'
      }
    ]
  },
  on_query1_btn_click() {
    // 获取数据
    console.log("点击查询")
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.cloud.callFunction({
      name: 'getData',
      data: {
        url: 'http://47.108.248.22:8080/api/getData/',
        flg: this.data.flg
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
        canIUseGetUserProfile: true,
        value1: 'SUM',
        name1: '月总收入',
        checked1: false,
        items: [{
            value: 'FST',
            name: '区域1',
            checked: true
          },
          {
            value: 'SED',
            name: '区域2'
          }
        ]
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
  },
  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value.length == 0 && this.data.flg2 == 0) {
      this.data.flg1 = 0
      this.data.flg = 1
    } else if (e.detail.value.length == 0 && this.data.flg2 == 1) {
      this.data.flg1 = 0
      this.data.flg = 3
    } else if (e.detail.value.length == 1 && this.data.flg2 == 0) {
      this.data.flg1 = 1
      this.data.flg = 2
    } else if (e.detail.value.length == 1 && this.data.flg2 == 1) {
      this.data.flg1 = 1
      this.data.flg = 4
    }
    console.log("flg = " + this.data.flg + "\nflg1 = " + this.data.flg1 + "\nflg2 = " + this.data.flg2)
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value == 'FST' && this.data.flg1 == 0) {
      this.data.flg = 1
      this.data.flg2 = 0
    } else if (e.detail.value == 'FST' && this.data.flg1 == 1) {
      this.data.flg = 2
      this.data.flg2 = 0
    } else if (e.detail.value == 'SED' && this.data.flg1 == 0) {
      this.data.flg = 3
      this.data.flg2 = 1
    } else if (e.detail.value == 'SED' && this.data.flg1 == 1) {
      this.data.flg = 4
      this.data.flg2 = 1
    }

    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
    console.log("flg = " + this.data.flg + "\nflg1 = " + this.data.flg1 + "\nflg2 = " + this.data.flg2)
  }
})