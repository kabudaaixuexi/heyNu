import * as T from './actions-type'
import { combineReducers } from '../libs/redux.min.js'

function common(common={},action) {
  switch (action.type) {
    case T.SET_USERINFO:
      wx.setStorageSync('userInfo', action.data)
      return {
        ...common,
        userInfo :{
          ...action.data
        }
      }
    break;

    case T.CLEAR_USERINFO:
      wx.removeStorageSync('userInfo')
      return {
        ...common,
        userInfo :null
      }
    break;

    case T.SET_LOCATION:
      return {
        ...common,
        location :{
          ...action.data
        }
      }
    break;

    case T.SET_OPENID:
      return {
        ...common,
        openid : action.data
      }
    break;

    case T.SET_FOOD_CAR:
      return {
        ...common,
        foodCar : action.data
      }
    default:
      return common
  }
}


const app = combineReducers({
  common
})

export default app