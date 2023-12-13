import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen:false
}

const openChatSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    openModalChat: (state, action) => {
      state.isOpen = action.payload
    }
  }
})

export const { openModalChat } = openChatSlice.actions
export default openChatSlice.reducer
