import { createSlice } from '@reduxjs/toolkit'

const initialState =  {friend:{}}


const friendInformationSlice = createSlice({
  name: 'friendInformationSlice',
  initialState,
  reducers: {
    updateFriendInformation: (state, action) => {
      state.friend=action.payload
    }
  }
})

export const { updateFriendInformation } = friendInformationSlice.actions
export default friendInformationSlice.reducer
