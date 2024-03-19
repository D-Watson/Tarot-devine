// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight : 0,
    textLines: ["第一行文本", "第二行文本", "第三行文本", "第四行文本", "第五行文本"],
    animation: null,
    animationDuration: 500, // 滚动一个文本所需的时间（单位：毫秒）
    animationInterval: 500, // 两次滚动之间的间隔时间（单位：毫秒）
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSystemHeight();
    this.startScrollAnimation();
   
  },
  getSystemHeight: function(){
    wx.getSystemInfo({
      success: (res) => {  // 使用箭头函数
        var s = res.screenHeight;
        this.setData({
          screenHeight: s
        });
      }
    });
  },
  startScrollAnimation: function() {
    var that = this;
    var textLines = this.data.textLines;
    var animation = wx.createAnimation({
      duration: that.data.animationDuration,
      timingFunction: 'linear'
    });

    // 动画从上往下滚动
    animation.translateY(-textLines.length * 20).step();
    that.setData({
      animation: animation.export()
    });

    // 延迟指定的间隔时间后，重置动画并再次滚动
    setTimeout(function() {
      animation.translateY(0).step({ duration: 0 });
      that.setData({
        animation: animation.export()
      });
      setTimeout(function() {
        that.startScrollAnimation();
      }, that.data.animationInterval);
    }, that.data.animationDuration);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})