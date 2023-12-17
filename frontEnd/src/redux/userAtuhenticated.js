import { createSlice } from '@reduxjs/toolkit'

const currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
const initialState = currentUser?.isUserAuthenticated || false

const userAuthenticated = createSlice({
  name: 'userAuthenticated',
  initialState,
  reducers: {
    setIsUserAuthenticated: (state, action) => {
      return action.payload
    }
  }
})

export const { setIsUserAuthenticated } = userAuthenticated.actions
export default userAuthenticated.reducer
