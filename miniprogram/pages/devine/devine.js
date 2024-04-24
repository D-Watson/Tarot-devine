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
    firstClick: [],
  },

  //翻转牌面
  rotateCard:function(id){
    console.log("00000")
    var firstClickArr = this.data.firstClick
    var top, left, right = 0
    var styleArr = this.data.cardStyles
    var query = wx.createSelectorQuery().selectAll('.card-'+id).boundingClientRect(function (rect) {
      top = rect[0].top
      left = rect[0].left
      right = rect[0].right
      console.log(left)
    }).exec((res) => {
      const style = {
        width: '150rpx',
        height: '300rpx',
        'background-image': 'url("https://6c65-lets-play-4g9llnlf4dd7edd7-1304389115.tcb.qcloud.la/taro.png?sign=ed773529996b850108477026ec993f61&t=1711380518")',
        'background-size': `cover`,
        'background-position': `center`,
        'position': `absolute`,
        'top': top,
        'left': left,
        'right': right
      };
      styleArr[id] = Object.keys(style).map(key => `${key}: ${style[key]};`).join(' ')
      let m = wx.createAnimation({duration: 200});
      m.rotateY(180).step();
      var moving = this.data.move
      moving[id] = m.export();
      console.log(moving[id])
      this.setData({
        move: moving,
        cardStyles: styleArr
      })
    })
  },

  handelClicks:function(e){
    const idx = e.currentTarget.dataset.idx;
    console.log(this.data.firstClick[idx])
    if(this.data.firstClick[idx] === 0){
      this.handleDivClick(idx) 
    }else{
      this.rotateCard(idx)
    }
  },

  handleDivClick: function(id) {
    if (this.data.haveOnePick) {
      return;
    }
    var that = this; // 保存当前上下文
    var query = wx.createSelectorQuery();
    
    query.selectAll('.card-' + id).boundingClientRect((rect) => {
      var left = rect[0].left;
      let m = wx.createAnimation({ duration: 200 });
      m.translateY(-400).step();
      m.translateX(270 / 750 * wx.getSystemInfoSync().windowWidth - left).step();
      var moving = that.data.move;
      moving[id] = m.export();
      var firstClickArr = that.data.firstClick;
      firstClickArr[id] = 1;
      that.setData({
        move: moving,
        haveOnePick: true,
        pickedIdx: id,
        firstClick: firstClickArr,
      });
    });
    query.exec();
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
    var firstClick = []
    for (let i = 0; i < 15; i++) {
      const style = this.getCardStyle(i);
      firstClick.push(0)
      items.push(style)
    }
    for(let i=0;i<15;i++){
      moves.push(undefined)
    }
    this.setData({
      cardStyles: items,
      move: moves,
      haveOnePick: false,
      firstClick: firstClick,
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