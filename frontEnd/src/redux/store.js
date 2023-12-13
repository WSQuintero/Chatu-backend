import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import openChatReducer from './openChatSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    isOpenChat: openChatReducer
  }
})

export default store
