import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  userName: null,
  userEmail: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { name, userName, userEmail } = action.payload
      state.name = name
      state.userName = userName
      state.email = userEmail
    },
    changeEmail: (state, action) => {
      state.email = action.payload
    }
  }
})

export const { addUser, changeEmail } = userSlice.actions
export default userSlice.reducer
