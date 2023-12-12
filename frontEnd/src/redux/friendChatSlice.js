import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  email: null
}

const friendsChatSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFriend: (state, action) => {
      const { name, email } = action.payload
      state.name = name
      state.email = email
    },
  }
})

export const { setFriend } = friendsChatSlice.actions
export default friendsChatSlice.reducer
