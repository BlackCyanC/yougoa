// 专门用来操纵购物车商品

// 使用常量 来保存 key
const key = 'cart';

// 地址的key
const addressKey = 'addressInfo'

let cart = {
  // 参数1:id
  add2Cart(id) {
    // 读取缓存数据
    wx.getStorage({
      key,
      success: (res) => {
        console.log(res.data)
        // 说明有缓存的数据
        let cartData = res.data;
        // 判断 在保存
        // 保存数据
        if (cartData[id] != undefined) {
          // 第二次
          cartData[id]++;
        } else {
          // 第一次
          cartData[id] = 1;
        }
        wx.setStorage({
          key,
          data: cartData
        })
      },
      fail: () => {
        // 说明还没有保存数据
        console.log('没有数据')
        // 初始化数据 然后 保存数据
        let cartData = {};
        cartData[id] = 1;
        // 缓存起来
        wx.setStorage({
          key,
          data: cartData
        });
      },
      complete: () => {}
    })

  },
  // 读取购物车缓存数据
  getCartData() {
    // 使用Promise封装 
    return new Promise((resolve, reject) => {
      // 读取缓存 
      wx.getStorage({
        key,
        success: (res) => {
          // console.log(res.data)
          resolve(res);
        },
        fail: () => {
          reject('失败啦')
        },
        complete: () => {}
      })
    })
  },
  // 修改购物车数据的函数
  updateCartData(newData) {
    // 把数据的修改同步到缓存中
    let obj = {};
    newData.forEach(v => {
      obj[v.goods_id] = v.buyCount;
    });
    // 接收数据
    wx.setStorage({
      key,
      data: obj
    })
  },
  // 保存用户收货地址
  saveAddress(res) {
    // 选取地址之后 保存到缓存中
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key: addressKey,
        data: res,
        success: () => {
          resolve('保存成功')
        },
        fail: () => {
          reject('保存失败')
        }
      });
    })
  },
  // 读取用户收货地址
  getAddress() {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: addressKey,
        success: (res) => {
          // console.log(res.data)
          resolve(res.data)
        },
        fail: () => {
          reject('地址读取失败')
        },
        complete: () => {}
      })
    })
  }
}

// 暴露出去
export default cart;
