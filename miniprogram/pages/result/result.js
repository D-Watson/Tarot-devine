// pages/result/result.js
const DEFAULT_PAGE = 0;
Page({

  /**
   * 页面的初始数据
   */
  startX:0,
  currentView: DEFAULT_PAGE,
  data: {
    answer: '',
    past:{},
    now:{},
    future:{},
    currentIndex: 0,
    imgList:[],
    colorList:['black', 'green', 'red'],
    toView: `card_${DEFAULT_PAGE}`,
  },
  onTouchStart(e) {
    console.log(e.changedTouches[0].pageX);
    this.startX = e.changedTouches[0].pageX;
  },

  onTouchMove(e) {
    const moveX = e.changedTouches[0].pageX - this.startX;
    const maxPage = this.data.imgList.length - 1;
    if (Math.abs(moveX) >= 150){
      if (moveX > 0) {
        this.currentView = this.currentView !== 0 ? this.currentView - 1 : 0;
      } else {
        this.currentView = this.currentView !== maxPage ? this.currentView + 1 : maxPage;
      }
    }
    this.setData({
      toView: `card_${this.currentView}`
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let req = JSON.parse(options.req)
    console.log(req)

    this.setData({
      answer: req.answer,
      past: req.past,
      now: req.now,
      future: req.future,
      imgList: [req.past.url, req.now.url, req.future.url]
    })
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