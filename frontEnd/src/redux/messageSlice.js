import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    updateMessages: (state, action) => {
      const { message, user, sender, idConnection } = action.payload
      // Push a new object to the array
      state.push({ message, user, sender, idConnection })
    },
    resetMessages: (state) => {
      // Reset the state to the initial array
      return initialState
    }
  }
})

export const { updateMessages, resetMessages } = messageSlice.actions
export default messageSlice.reducer
