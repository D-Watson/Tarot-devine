// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    screenHeight : 0,
    userQuestion:'',
    questions:[
      "我和他接下来感情发展如何？",
      "我们近期能复合么？",
      "他对我们的关系是怎么想的？",
      "我最近财运怎么样？",
      "我接下来的工作进展如何？",
      "今天我要表白吗？",
      "我会升职加薪吗",
      "接下来的事业运如何"
    ]
  },

  changeList(){
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(this.data.userQuestion)
    this.getSystemHeight();
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
  getUserQuestion:function(e){
    var index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      userQuestion: this.data.questions[index]
    })
  },
  answerQuestion:function(){
    console.log(this.data.userQuestion)
    if(this.data.userQuestion === ''){
      wx.showToast({
        title: '你的困惑和疑问呐？',
        icon: 'none',
        duration: 2000
      });      
      return
    }
    wx.navigateTo({
      url: `/pages/devine/devine?question=${this.data.userQuestion}`,
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