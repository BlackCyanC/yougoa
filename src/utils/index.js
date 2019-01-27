let hxios = {}
let baseUrl = 'https://autumnfish.cn/wx/'

hxios.get = (options) => {
  if (options.url) {
    options.url = baseUrl + options.url
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url || 'url', //开发者服务器接口地址",
      data: options.data || 'data', //请求的参数",
      method: 'GET',
      dataType: options.dataType || 'json', //如果设为json，会尝试对返回的数据做一次 JSON.parse
      success: resolve,
      fail: reject,
    });
  })
}

export default hxios
