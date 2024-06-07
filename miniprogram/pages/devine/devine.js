// pages/devine/devine.js
const fs = wx.getFileSystemManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardStyles: [],
    move: [],
    pickedIdx: [],
    beforePosition: {},
    nowPosition: {},
    futurePosition: {},
    tarot_info: []
  },

  handelClicks:function(e){
    const idx = e.currentTarget.dataset.idx;
    console.log(this.data.firstClick[idx])
    this.handleDivClick(idx) 
  },

  handleDivClick: function(id) {
    var len = this.data.pickedIdx.length;
    if (len === 3) {
      return;
    }
    var position = {};
    switch(len){
      case 0:
        position = this.data.beforePosition;
        break;
      case 1:
        position = this.data.nowPosition;
        break;
      case 2:
        position = this.data.futurePosition;
        break;
    }
    var that = this; // 保存当前上下文
    var query = wx.createSelectorQuery();
    query.selectAll('.card-' + id).boundingClientRect((rect) => {
      var left = rect[0].left;
      let m = wx.createAnimation({ duration: 200 });
      m.translateY(position.top - rect[0].top).step();
      m.translateX(position.left - rect[0].left).step();
      var moving = that.data.move;
      moving[id] = m.export();
      var pickedIdx = that.data.pickedIdx;
      pickedIdx.push(id);
      that.setData({
        move: moving,
        haveOnePick: true,
        pickedIdx: pickedIdx,
      });
    });
    query.exec();
  },
  getBeforePosition:function(){
    var query = wx.createSelectorQuery();
    query.selectAll(".before").boundingClientRect((rect) => {
      this.setData({
        beforePosition: rect[0]
      })
    }).exec();
  },
  getNowPosition:function(){
    var query = wx.createSelectorQuery();
    query.selectAll(".now").boundingClientRect((rect) => {
      this.setData({
        nowPosition: rect[0]
      })
    }).exec();
  },
  getFuturePosition:function(){
    var query = wx.createSelectorQuery();
    query.selectAll(".future").boundingClientRect((rect) => {
      this.setData({
        futurePosition: rect[0]
      })
    }).exec();
  },
  getCardStyle:function(index){
    const rotationAngle = (index-5)*3.6; // 递增角度
    const style = {
      width: '150rpx',
      height: '300rpx',
      'margin-left': '-115rpx',
      'background-image': 'url("https://tarot-cards.oss-rg-china-mainland.aliyuncs.com/tarot/WechatIMG5.png?Expires=1717768300&OSSAccessKeyId=TMP.3Khw5LnCjgKyJdEmvruyoASdVVAv2DTBrR8GfTeRfZAbGqdpFg4NQsLnm686pj1ZuHd1bg2Dteh3q5de5dcDzYA3YRB6em&Signature=h3RsUidJKnfqRoUKd%2FyaHohlIQE%3D")',
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
    this.getBeforePosition();
    this.getNowPosition();
    this.getFuturePosition();
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
    this.initialTarotInfo();
    this.setData({
      cardStyles: items,
      move: moves,
      haveOnePick: false,
      firstClick: firstClick,
    });
    console.log(this.data.tarot_info);
    console.log(this.data.tarot_info.len);
  },

  initialTarotInfo:function(){
    fs.readFile({
      filePath: `/pages/devine/image_data.json`,
      encoding: 'utf8',
      success: res => {
        console.log(res); // 打印 res 对象
        const data = JSON.parse(res.data);
        // 处理读取到的 JSON 数据
        console.log(data);
        this.setData({
          tarot_info: data
        })
      },
      fail: err => {
        console.error('读取 JSON 文件失败:', err);
      }
    });
  },

  devine:function(){
    const question = "圣杯10，我与他能否复合"
    //获取
    wx.request({
      url: 'https://api.moonshot.cn/v1/chat/completions', 
      data: {
        "model": "moonshot-v1-8k",
        "messages": [
            {
                "role": "system",
                "content": "你要扮演塔罗牌占卜师，不许出现塔罗牌没有科学依据这样的解释，请根据每张牌含义，要让用户信服你的说辞和分析。"
            },
            { "role": "user", "content": question }
        ],
        "temperature": 0.3
    },
      header: {
        'content-type': 'application/json',
        "authorization":"bearer"+"sk-FAUulmfXZSTOzem6R15DG4F8fXzcz0lOjcTLzNlEI6YSB20L"
      },
      success (res) {
        console.log(res.data)
      }
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