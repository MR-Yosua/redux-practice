import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    todoList:[]
}

const todoSlice = createSlice({
    name:'todos',
    initialState,
    reducers:{
        addTodo:( state,action )=>{
            const todo={
                id: Date.now(),
                item:action.payload.item,
                done:false
            }
            state.todoList.push(todo);
        },
        deleteAllTodo:()=>{
            return initialState;
        },
        deleteTodoByID:(state,action)=>{
            const filtered = state.todoList.filter(todo=> todo.id !== action.payload);
            state.todoList = filtered;
        },
        updateDoneState:(state,action)=>{
            const updated = state.todoList.map(todo => todo.id === action.payload.id? action.payload : todo);
            state.todoList = updated;
        },
       
            // console.log(state.todoList.slice(-1).pop().id;) 
        
}
});

export const {addTodo,deleteAllTodo,deleteTodoByID,updateDoneState} = todoSlice.actions;
export const selectTodo = state => state.todos.todoList;
export const selectLastTodo = state => state.todos.todoList.slice(-1).pop();
export default todoSlice.reducer