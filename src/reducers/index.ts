import { combineReducers } from 'redux'
import { reducer as ReduxReducer } from 'redux-form'

import authReducer from './authReducer'
import streamReducer from './streamReducer'

export default combineReducers({
   auth: authReducer,
   form:ReduxReducer, 
   streams:streamReducer,

})