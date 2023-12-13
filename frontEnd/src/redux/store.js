import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import openChatReducer from './openChatSlice'
import friendInformationReducer from './friendInformationSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    isOpenChat: openChatReducer,
    friendInformation: friendInformationReducer
  }
})

export default store
