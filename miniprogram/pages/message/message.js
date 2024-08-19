// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      messageList: [],
      message: ''
  },

  messageInput(e){
     this.setData({
       message: e.detail.value
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      messageList:[
      ]
    })
  },
  // 发送消息
  sendMessage(){
    let content = this.data.message;
    let messageList = this.data.messageList;
    messageList.push({
      author: 1,
      content: content,
      timestamp: new Date().getTime()
    })
    this.setData({
      messageList: messageList,
      message: ''
    })
    this.sendRequest(content)
  },

  // 请求kimi
  sendRequest(content){
    let that = this
     //获取
     wx.request({
      url: 'https://api.moonshot.cn/v1/chat/completions', 
      method: 'POST',
      data: {
        "model": "moonshot-v1-8k",
        "messages": [
            {
                "role": "system",
                "content": `你是占卜师陶墨沫，是一个理性睿智的少女形象，不许出现塔罗牌没有科学依据这样的解释，请根据我的问题回答我，要让用户信服你的说辞和分析,字数不要超过50字。`
            },
            { "role": "user", "content": `${content}` }
        ],
        "temperature": 0.3
    },
      header: {
        'content-type': 'application/json',
        "authorization":"Bearer sk-FAUulmfXZSTOzem6R15DG4F8fXzcz0lOjcTLzNlEI6YSB20L"
      },
      success (res) {
        console.log(res.data.choices)
        let answer = res.data.choices[0].message.content;
        console.log(answer)
        let list = that.data.messageList;
        list.push({
          author: 0,
          content: answer,
          timestamp: new Date().getTime()
        });
        that.setData({
          messageList: list
        })
      },
      complete(){
        
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