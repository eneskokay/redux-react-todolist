import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Todos:(() => JSON.parse(localStorage.getItem("todos")) || { 0:{} } )(),
}

const TodosSlice = createSlice({
    name:'todos',
    initialState,
    reducers:{
        AddTodo:(state, action) => {
            state.Todos[action.payload.userID] = {
                ...state.Todos[action.payload.userID],
                [state.Todos[action.payload.userID] ? 
                propertyName(state, action) : 0]:{name:action.payload.input, checked:false}
            }
            localStorage.setItem( "todos", JSON.stringify(state.Todos) );
        },
        removeTodo:(state, action) => {
            delete state.Todos[Number(action.payload)];
            console.log("action",action)
            localStorage.setItem("todos", JSON.stringify(state.Todos) );
        },
        removeTodoItem:(state, action) => {
            console.log("geldi todoıtem", action);
            delete state.Todos[action.payload['todoID']][action.payload['id']];
            localStorage.setItem("todos", JSON.stringify(state.Todos) );
        },
        changeStatement:(state, action) => {
            state.Todos[action.payload['todoID']][action.payload['id']].checked = !state.Todos[action.payload['todoID']][action.payload['id']].checked;
            localStorage.setItem("todos", JSON.stringify(state.Todos) );
        },
        changeContent:(state, action) => {
            state.Todos[action.payload['todoID']][action.payload['id']].name = action.payload['NameContent'];
            localStorage.setItem("todos", JSON.stringify(state.Todos) );
        },
    }
});



const propertyName = (state, action) => {
    let index = 0;
    if(Object.values(state.Todos[action.payload.userID]).length > 0){
        for(const i in state.Todos[action.payload.userID]){
            index ++;
            if(index === Object.values(state.Todos[action.payload.userID]).length) { 
                return (Number(i)+1)
            }
        }
    }
    else {
        return 0
    }
}


export const {AddTodo, removeTodo, removeTodoItem, changeStatement, changeContent } = TodosSlice.actions;
export default TodosSlice.reducer;