import request from "./request";

export const login = (data: Object) => {
  return request({
    url: '/login',
    method: 'get',
    data
  })
}

export const logout = () => {
  return request({
    url: '/logout',
    method: 'get',
  })
}

export const getUserInfo = () => {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

export const getHomeInfo = () => {
  return request({
    url: '/getHomeInfo?type=m',
    method: 'get'
  })
}

export const updateUserInfo = (data: Object) => {
  return request({
    url: '/updateUserInfo',
    method: 'post',
    data
  })
}

export const resetPassword = (data: Object) => {
  return request({
    url: 'resetPassword',
    method: 'post',
    data
  })
}

export const getDetailInfo = (data: Object) => {
  return request({
    url: '/getDetailInfo',
    method: 'get',
    data
  })
}

export const getGuessGoods = (data: Object) => {
  return request({
    url: '/getRandomGoodsList',
    method: 'get',
    data
  })
}

export const getCartList = () => {
  return request({
    url: '/getCartList',
    method: 'get'
  })
}

export const addCart = (data: Object) => {
  return request({
    url: '/addCart',
    method: 'post',
    data
  })
}

export const deleteCart = (data: Object) => {
  return request({
    url: '/deleteCart',
    method: 'post',
    data
  })
}

export const updateCart = (data: Object) => {
  return request({
    url: '/updateCart',
    method: 'post',
    data
  })
}

export const getCollection = () => {
  return request({
    url: '/getCollection',
    method: 'get'
  })
}

export const addCollection = (data: Object) => {
  return request({
    url: '/addCollection',
    method: 'get',
    data
  })
}

export const deleteCollection = (data: Object) => {
  return request({
    url: '/deleteCollection',
    method: 'post',
    data
  })
}

export const getHistory = () => {
  return request({
    url: '/getHistory',
    method: 'get'
  })
}

export const addHistory = (data: Object) => {
  return request({
    url: '/addHistory',
    method: 'get',
    data
  })
}

export const deleteHistory = (data: Object) => {
  return request({
    url: '/deleteHistory',
    method: 'post',
    data
  })
}

export const getCategory = () => {
  return request({
    url: '/getCategory',
    method: 'get'
  })
}

export const getSearchList = (data: Object) => {
  return request({
    url: '/getSearchList',
    method: 'get',
    data
  })
}

export const getMoreData = async(data: Object) => {
  const result = request({
    url: '/getSearchList',
    method: 'get',
    data
  }).then(res => res.data.searchList);
  return result;
}
