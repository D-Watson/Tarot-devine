// pages/devine/devine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardStyles: [],
    move: [],
    haveOnePick: false,
    pickedIdx: -1,
  },

  //翻转牌面
  rotateCard:function(e){
    console.log("000000")
    let m = wx.createAnimation({duration: 200});
    m.rotateY(180).step();
    var moving = this.data.move
    moving[idx] = m.export();
    this.setData({
      move: moving,
    })
  },

  handleDivClick:function(e){
    if(this.data.haveOnePick){
      return 
    }
    const idx = e.currentTarget.dataset.idx;
    var left = 0
    var query = wx.createSelectorQuery().selectAll('.card-'+idx).boundingClientRect(function (rect) {
      left = rect[0].left
    }).exec((res) => {
      let m = wx.createAnimation({duration: 200});
      m.translateY(-400).step();
      m.translateX(270 / 750 * wx.getSystemInfoSync().windowWidth - left).step();
      var moving = this.data.move
      moving[idx] = m.export();
      this.setData({
        move: moving,
        haveOnePick: true,
        pickedIdx: idx,
      })
    })
    
  },

  getCardStyle:function(index){
    const rotationAngle = (index-5)*3.6; // 递增角度
    const style = {
      width: '150rpx',
      height: '300rpx',
      'margin-left': '-115rpx',
      'background-image': 'url("https://6c65-lets-play-4g9llnlf4dd7edd7-1304389115.tcb.qcloud.la/taro.png?sign=ed773529996b850108477026ec993f61&t=1711380518")',
      'background-size': `cover`,
      'background-position': `center`,
      transform: `rotate(${rotationAngle}deg)`,
      'transition': `all 3s ease`,
    };
    return Object.keys(style).map(key => `${key}: ${style[key]};`).join(' ');
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var items = []
    var moves = []
    for (let i = 0; i < 15; i++) {
      const style = this.getCardStyle(i);
      items.push(style)
    }
    for(let i=0;i<15;i++){
      moves.push(undefined)
    }
    this.setData({
      cardStyles: items,
      move: moves,
      haveOnePick: false,
    });
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