import { createSlice } from '@reduxjs/toolkit'

const initialState = JSON.parse(sessionStorage.getItem('currentUser')) || {
  name: null,
  email: null,
  friends: [],
  uid: [],
  idConnection: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { name, email, friends, uid, idConnection, perfilPhoto } =
        action.payload

      state.name = name
      state.email = email
      state.friends = friends
      state.uid = uid
      state.idConnection = idConnection
      state.perfilPhoto = perfilPhoto
    }
  }
})

export const { addUser } = userSlice.actions
export default userSlice.reducer
