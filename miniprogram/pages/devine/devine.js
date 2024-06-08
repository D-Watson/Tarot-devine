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
    tarot_info: [],
    tarot_random_idx: []
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
      'background-image': 'url("https://pets-shop.oss-cn-beijing.aliyuncs.com/tarot/3db0fc0d93a91304ae0e9159bfeba0b7.png")',
      'background-size': `cover`,
      'background-position': `center`,
      transform: `rotate(${rotationAngle}deg)`,
      'transition': `all 3s ease`,
    };
    return Object.keys(style).map(key => `${key}: ${style[key]};`).join(' ');
  },
  //生成随机数
  generateRandomNumbers:function(min, max, count) {
    const numbers = [];
    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return numbers;
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
      tarot_random_idx: this.generateRandomNumbers(0, 111, 15)
    });
    console.log(this.data.tarot_random_idx)
  },

  initialTarotInfo:function(){
    this.setData({
      tarot_info:[ {
        "name" : "圣杯七",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E4%B8%83.jpg"
      }, {
        "name" : "圣杯七逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E4%B8%83%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "圣杯三",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E4%B8%89.jpg"
      }, {
        "name" : "圣杯三逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E4%B8%89%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "圣杯九",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E4%B9%9D.jpg"
      }, {
        "name" : "圣杯九逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E4%B9%9D%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "圣杯二",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E4%BA%8C.jpg"
      }, {
        "name" : "圣杯二逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E4%BA%8C%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "圣杯五",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E4%BA%94.jpg"
      }, {
        "name" : "圣杯五逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E4%BA%94%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "圣杯侍从",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E4%BE%8D%E4%BB%8E.jpg"
      }, {
        "name" : "圣杯侍从逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E4%BE%8D%E4%BB%8E%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "圣杯八",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E5%85%AB.jpg"
      }, {
        "name" : "圣杯八逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E5%85%AB%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "圣杯六",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E5%85%AD.jpg"
      }, {
        "name" : "圣杯六逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E5%85%AD%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "圣杯十",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E5%8D%81.jpg"
      }, {
        "name" : "圣杯十逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E5%8D%81%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "圣杯四",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E5%9B%9B.jpg"
      }, {
        "name" : "圣杯四逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E5%9B%9B%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "圣杯国王",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E5%9B%BD%E7%8E%8B.jpg"
      }, {
        "name" : "圣杯国王逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E5%9B%BD%E7%8E%8B%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "圣杯皇后",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E7%9A%87%E5%90%8E.jpg"
      }, {
        "name" : "圣杯皇后逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E7%9A%87%E5%90%8E%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "圣杯首牌",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E9%A6%96%E7%89%8C.jpg"
      }, {
        "name" : "圣杯首牌逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E9%A6%96%E7%89%8C%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "圣杯骑士",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E9%AA%91%E5%A3%AB.jpg"
      }, {
        "name" : "圣杯骑士逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%9C%A3%E6%9D%AF%E9%AA%91%E5%A3%AB%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑七",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E4%B8%83.jpg"
      }, {
        "name" : "宝剑七逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E4%B8%83%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑三",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E4%B8%89.jpg"
      }, {
        "name" : "宝剑三逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E4%B8%89%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑九",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E4%B9%9D.jpg"
      }, {
        "name" : "宝剑九逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E4%B9%9D%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑二",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E4%BA%8C.jpg"
      }, {
        "name" : "宝剑二逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E4%BA%8C%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑五",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E4%BA%94.jpg"
      }, {
        "name" : "宝剑五逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E4%BA%94%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑侍从",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E4%BE%8D%E4%BB%8E.jpg"
      }, {
        "name" : "宝剑侍从逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E4%BE%8D%E4%BB%8E%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑八",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E5%85%AB.jpg"
      }, {
        "name" : "宝剑八逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E5%85%AB%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑六",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E5%85%AD.jpg"
      }, {
        "name" : "宝剑六逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E5%85%AD%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑十",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E5%8D%81.jpg"
      }, {
        "name" : "宝剑十逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E5%8D%81%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑四",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E5%9B%9B.jpg"
      }, {
        "name" : "宝剑四逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E5%9B%9B%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑国王",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E5%9B%BD%E7%8E%8B.jpg"
      }, {
        "name" : "宝剑国王逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E5%9B%BD%E7%8E%8B%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑皇后",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E7%9A%87%E5%90%8E.jpg"
      }, {
        "name" : "宝剑皇后逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E7%9A%87%E5%90%8E%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑首牌",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E9%A6%96%E7%89%8C.jpg"
      }, {
        "name" : "宝剑首牌逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E9%A6%96%E7%89%8C%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "宝剑骑士",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E9%AA%91%E5%A3%AB.jpg"
      }, {
        "name" : "宝剑骑士逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E5%AE%9D%E5%89%91%E9%AA%91%E5%A3%AB%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币七",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E4%B8%83.jpg"
      }, {
        "name" : "星币七逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E4%B8%83%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币三",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E4%B8%89.jpg"
      }, {
        "name" : "星币三逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E4%B8%89%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币九",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E4%B9%9D.jpg"
      }, {
        "name" : "星币九逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E4%B9%9D%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币二",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E4%BA%8C.jpg"
      }, {
        "name" : "星币二逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E4%BA%8C%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币五",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E4%BA%94.jpg"
      }, {
        "name" : "星币五逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E4%BA%94%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币侍从",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E4%BE%8D%E4%BB%8E.jpg"
      }, {
        "name" : "星币侍从逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E4%BE%8D%E4%BB%8E%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币八",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E5%85%AB.jpg"
      }, {
        "name" : "星币八逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E5%85%AB%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币六",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E5%85%AD.jpg"
      }, {
        "name" : "星币六逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E5%85%AD%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币十",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E5%8D%81.jpg"
      }, {
        "name" : "星币十逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E5%8D%81%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币四",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E5%9B%9B.jpg"
      }, {
        "name" : "星币四逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E5%9B%9B%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币国王",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E5%9B%BD%E7%8E%8B.jpg"
      }, {
        "name" : "星币国王逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E5%9B%BD%E7%8E%8B%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币皇后",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E7%9A%87%E5%90%8E.jpg"
      }, {
        "name" : "星币皇后逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E7%9A%87%E5%90%8E%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币首牌",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E9%A6%96%E7%89%8C.jpg"
      }, {
        "name" : "星币首牌逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E9%A6%96%E7%89%8C%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "星币骑士",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E9%AA%91%E5%A3%AB.jpg"
      }, {
        "name" : "星币骑士逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%98%9F%E5%B8%81%E9%AA%91%E5%A3%AB%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖七",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E4%B8%83.jpg"
      }, {
        "name" : "权杖七逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E4%B8%83%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖三",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E4%B8%89.jpg"
      }, {
        "name" : "权杖三逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E4%B8%89%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖九",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E4%B9%9D.jpg"
      }, {
        "name" : "权杖九逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E4%B9%9D%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖二",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E4%BA%8C.jpg"
      }, {
        "name" : "权杖二逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E4%BA%8C%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖五",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E4%BA%94.jpg"
      }, {
        "name" : "权杖五逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E4%BA%94%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖侍从",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E4%BE%8D%E4%BB%8E.jpg"
      }, {
        "name" : "权杖侍从逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E4%BE%8D%E4%BB%8E%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖八",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E5%85%AB.jpg"
      }, {
        "name" : "权杖八逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E5%85%AB%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖六",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E5%85%AD.jpg"
      }, {
        "name" : "权杖六逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E5%85%AD%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖十",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E5%8D%81.jpg"
      }, {
        "name" : "权杖十逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E5%8D%81%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖四",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E5%9B%9B.jpg"
      }, {
        "name" : "权杖四逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E5%9B%9B%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖国王",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E5%9B%BD%E7%8E%8B.jpg"
      }, {
        "name" : "权杖国王逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E5%9B%BD%E7%8E%8B%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖皇后",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E7%9A%87%E5%90%8E.jpg"
      }, {
        "name" : "权杖皇后逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E7%9A%87%E5%90%8E%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖首牌",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E9%A6%96%E7%89%8C.jpg"
      }, {
        "name" : "权杖首牌逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E9%A6%96%E7%89%8C%E9%80%86%E4%BD%8D.jpg"
      }, {
        "name" : "权杖骑士",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E9%AA%91%E5%A3%AB.jpg"
      }, {
        "name" : "权杖骑士逆位",
        "url" : "https://pets-shop.oss-cn-beijing.aliyuncs.com/%E6%9D%83%E6%9D%96%E9%AA%91%E5%A3%AB%E9%80%86%E4%BD%8D.jpg"
      } ]
    })
  },

  answerQuestion:function(){
    const data = this.data
    console.log(`-------${data.tarot_random_idx[data.pickedIdx[0]]}`)
    const past = data.tarot_info[data.tarot_random_idx[data.pickedIdx[0]]].name
    const now = data.tarot_info[data.tarot_random_idx[data.pickedIdx[1]]].name
    const future = data.tarot_info[data.tarot_random_idx[data.pickedIdx[2]]].name
    console.log(`now is ${now}, past = ${past}, future=${future}`)
    console.log(this.devine(past, now, future, "能复合吗"))
  },

  devine:function(past, now, future ,question){
    const pastQuestion = `${past}, 我的问题是${question}`
    const nowQuestion = `${now}, 我的问题是${question}`
    const futureQuestion = `${future}, 我的问题是${question}`
    //获取
    wx.request({
      url: 'https://api.moonshot.cn/v1/chat/completions', 
      method: 'POST',
      data: {
        "model": "moonshot-v1-8k",
        "messages": [
            {
                "role": "system",
                "content": `你要扮演塔罗牌占卜师，不许出现塔罗牌没有科学依据这样的解释，请根据每张牌含义，要让用户信服你的说辞和分析,字数不要超过300字。`
            },
            { "role": "user", "content": `${pastQuestion},请根据牌面和问题回答我过去的状态` },
            { "role": "user", "content": `${nowQuestion},请根据牌面和问题回答我当前的状态` },
            { "role": "user", "content": `${futureQuestion},请根据牌面和问题回答我将来的状态` },
        ],
        "temperature": 0.3
    },
      header: {
        'content-type': 'application/json',
        "authorization":"Bearer sk-FAUulmfXZSTOzem6R15DG4F8fXzcz0lOjcTLzNlEI6YSB20L"
      },
      success (res) {
        console.log(res)
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