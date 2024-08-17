// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      messageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      messageList:[
        {
          author: 0, //0=ai, 1=本人
          content: 'ssssssssss',
          timestamp: 0,
        } 
      ]
    })
  },
  // 发送消息
  sendMessage(content){
    let messageList = this.messageList;
    messageList.push({
      author: 1,
      content: content,
      timestamp: new Date().getTime()
    })
    this.setData({
      messageList: messageList
    })

  },

  // 请求kimi
  sendRequest(content){
     //获取
     wx.request({
      url: 'https://api.moonshot.cn/v1/chat/completions', 
      method: 'POST',
      data: {
        "model": "moonshot-v1-8k",
        "messages": [
            {
                "role": "system",
                "content": `你要扮演塔罗牌占卜师，不许出现塔罗牌没有科学依据这样的解释，请根据我的问题回答我，要让用户信服你的说辞和分析,字数不要超过300字。`
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
        
      },
      complete(){
        let request = JSON.stringify(req);
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