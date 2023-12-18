import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import openChatReducer from './openChatSlice'
import friendInformationReducer from './friendInformationSlice'
import messagesReducer from './messageSlice'
import userAuthenticatedReducer from './userAtuhenticated'
import userFriendsInformationSliceReducer from './userFriendsInformationSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    isOpenChat: openChatReducer,
    friendInformation: friendInformationReducer,
    messages: messagesReducer,
    userAuthenticated: userAuthenticatedReducer,
    userFriendsInformation: userFriendsInformationSliceReducer
  }
})

export default store
