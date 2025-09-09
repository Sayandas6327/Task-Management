import  {createSlice, configureStore} from '@reduxjs/toolkit';
const authSlice = createSlice({
    name:"auth",
    initialState:{token:"" as string | null, _id:"" as string | null, isLoggedIn: false},
    reducers:{
        login(state, action){
            state.token = action.payload;
            state._id = action.payload;
            state.isLoggedIn = true;
            // sessionStorage.setItem("token", action.payload);
            // sessionStorage.setItem("_Id", action.payload);
        },
        logout(state){
            state.token = null;
            state._id = null;
            state.isLoggedIn = false;
            location.reload();
            // sessionStorage.removeItem("token");
            // sessionStorage.removeItem("_Id");
        }
    }
});

export const authActions = authSlice.actions;
export const store = configureStore({reducer: authSlice.reducer});