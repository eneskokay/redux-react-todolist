import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users:(() => JSON.parse(localStorage.getItem("users")) || {0:{name:"default",current:true,id:0}} )(),   
}

const propertyID = (state, action) => {
    let index = 0;
    if(Object.values(state.users).length > 0){ 
        for(const i in state.users){ 
            index ++; 
            if(index === Object.values(state.users).length) { 
                return (Number(i)+1) 
            }
        }
    }
    else {
        return 0
    }
}



const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        AddUser:(state, action) => {
            for(let i in state.users){
                state.users[i].current = false;
            }
            state.users = {...state.users, [propertyID(state)]:{name:action.payload, current:true, id:(propertyID(state)) } }  
            localStorage.setItem("users", JSON.stringify(state.users));
        },
        changeCurrent:(state, action) => {

            for(let i in state.users){
                state.users[i].current = false;
                if(state.users[i].id === action.payload){
                    state.users[i].current = true;
                }
            }
            localStorage.setItem("users", JSON.stringify(state.users)); 
            
        },
        removeUser:(state, action) => {
                for(let i in state.users){
                    if(state.users[i].id === action.payload && state.users[i].current === true){
                        delete state.users[i];
                        for(let l in state.users){
                            state.users[l].current = false;
                        }
                        state.users[Number(Object.keys(state.users)[Object.keys(state.users).length -1])].current = true;
                    }
                    else if (state.users[i].id === action.payload) {
                        delete state.users[i];
                    }
                }
                localStorage.setItem("users", JSON.stringify(state.users));
        }

    },
});


export const {AddUser, changeCurrent, removeUser} = usersSlice.actions;
export default usersSlice.reducer;