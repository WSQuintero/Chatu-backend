import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import openChatReducer from './openChatSlice'
import friendInformationReducer from './friendInformationSlice'
import messagesReducer from './messageSlice'
const store = configureStore({
  reducer: {
    user: userReducer,
    isOpenChat: openChatReducer,
    friendInformation: friendInformationReducer,
    messages: messagesReducer
  }
})

export default store
