import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  email: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { name,  userEmail } = action.payload
      state.name = name
      state.email = userEmail
    },

  }
})

export const { addUser } = userSlice.actions
export default userSlice.reducer
