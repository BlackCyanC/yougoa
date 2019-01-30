let hxios = {}

hxios.get = (options) => {

  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url || 'url', //开发者服务器接口地址",
      data: options.data || 'data', //请求的参数",
      method: 'GET',
      dataType: options.dataType || 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
      header: options.header || {
        // 为了调用*瓣接口 做的设置
        'content-type': 'json'
      },
      success: resolve,
      fail: reject,
    });
  })
}

export default hxios
