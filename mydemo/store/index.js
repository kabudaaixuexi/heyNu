import { createStore } from '../libs/redux.min.js'
import reducers from './reducers'

const store = createStore(reducers)

export default store