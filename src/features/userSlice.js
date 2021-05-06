import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    uid: null,
    userName: null,
    userEmail:null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setActiveUser:(state,action)=>{
            state.uid = action.payload.uid
            state.userName = action.payload.userName
            state.userEmail = action.payload.userEmail
        },
        setUserLogOut:(state)=>{
            state.uid = null
            state.userName = null
            state.userEmail = null
        }
    }
})

export const { setActiveUser, setUserLogOut } = userSlice.actions;

export const selectUid = state => state.user.uid;
export const selectUserName= state => state.user.userName;
export const selectUserEmail= state => state.user.userEmail;

export default userSlice.reducer;