import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    uid: null,
    userName: null,
    userEmail:null,
    photoURL:null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setActiveUser:(state,action)=>{
            state.uid = action.payload.uid
            state.userName = action.payload.userName
            state.userEmail = action.payload.userEmail
            state.photoURL = action.payload.photoURL || 'https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png'
        },
        setUserLogOut:(state)=>{
            state.uid = null
            state.userName = null
            state.userEmail = null
            state.photoURL = null
        }
    }
})

export const { setActiveUser, setUserLogOut } = userSlice.actions;

export const selectUid = state => state.user.uid;
export const selectUserName= state => state.user.userName;
export const selectUserEmail= state => state.user.userEmail;
export const selectUserImg= state => state.user.photoURL;
export default userSlice.reducer;