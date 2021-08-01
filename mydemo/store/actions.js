import * as T from './actions-type'


export function setUserInfo(data){
  return {
    type:T.SET_USERINFO,
    data
  }
}

export function setOpenid(data){
  return {
    type:T.SET_OPENID,
    data
  }
}

export function clearUserInfo(data) {
  return {
    type: T.CLEAR_USERINFO,
    data
  }
}

export function setLocation(data) {
  return {
    type: T.SET_LOCATION,
    data
  }
}

export function setFoodCar(data) {
  return {
    type: T.SET_FOOD_CAR,
    data
  }
}