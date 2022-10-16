import { configureStore } from '@reduxjs/toolkit';
import TodosSlice from './redux/todos/TodosSlice';
import usersSlice from './redux/users/usersSlice';

export default configureStore({
    reducer:{
        todos: TodosSlice,
        users: usersSlice,
    },
});