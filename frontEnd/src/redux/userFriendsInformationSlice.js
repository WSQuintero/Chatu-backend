import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const userFriendsInformationSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setUserFriends: (state, action) => {
     return action.payload
    }
  }
})

export const { setUserFriends } = userFriendsInformationSlice.actions
export default userFriendsInformationSlice.reducer
