import React, { useEffect, useState } from 'react'
import { db} from '../../firebase';
import { useDispatch, useSelector} from 'react-redux';
// import {useHistory} from 'react-router-dom';
// import { setUserLogOut } from '../../features/userSlice';
import './homescreen.css';
import {addTodo, deleteAllTodo } from '../../features/todoSlice';
import TodoList from '../todo/TodoList';
import {selectTodo} from '../../features/todoSlice';
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';
import SignInSignOut from '../card/SignInSignOut';
const HomeScreen = () => {
    
    // const todos = useSelector(state=>state.todos.todoList);
    
    // const lastTodo = useSelector(selectLastTodo);
    // const name = useSelector(state =>state.user.userName);
    const todos = useSelector(selectTodo);
    const uid = useSelector(state =>state.user.uid);

    // const history = useHistory();
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    const [newTodo, setNewTodo] = useState(false);


    useEffect(() => {
        db.collection('users').doc(uid).collection('todos').get().then(snapshot =>{
                dispatch(deleteAllTodo());
                snapshot.docs.forEach(doc =>{
                    dispatch(addTodo({
                        id:doc.data().id,
                        item:doc.data().item,
                        done:doc.data().done
                    }))
                })
             })
    }, [])


    const handleClick = () => {
        saveTodo();
        setNewTodo(true);
    }


    useEffect(() => {
        if(error){
            setTimeout(()=>{
                setError(!error);
            },1000)
        }
    }, [error])
    
    const saveTodo = async() => {

        if(input !== ''){
            await dispatch(addTodo({
                item:input
            }))
            

            setInput('');
            document.querySelector('#inputfield').focus();
            
            let element = document.getElementsByClassName("items-container");
            element[0].scrollTop = (element[0].scrollHeight)+42 ;
        }else{
            setError(!error);    
        }
    }

 
        
        
    
    return (
        <>
            {<SignInSignOut/>}
            <div className="container">
                <div className="title">
                    <h2>Todo de pelitos</h2>
                </div>
            <div className="todo-container">
                    <div className="todosection">
                        <div className="items-container">
                            {
                                todos.map(todo =>(
                                    // console.log("todo")
                                    //? '!!' al principio de una variable la convierte en boolean
                                    <TodoList key={todo.id} item={todo.item} id={todo.id}  checktodo={newTodo} doneTodo={!!todo.done}/>
                                ))
                            }
                        </div>

                        <div className="input-container">
                            <input
                                id='inputfield'
                                autoFocus
                                type="text"
                                value={input}
                                onChange={(e)=>setInput(e.target.value)}
                                placeholder="Ingresa Tarea"
                                onKeyPress={(e)=>(
                                    e.key ==='Enter' && handleClick()        
                                )}
                            />                    
                            <button
                                    onClick={handleClick}    
                                >
                                    Agregar tarea
                            </button>
                        </div>
                    </div>
                    {
                            error && 
                            <Fade in={error}>
                                <Alert variant="filled" severity="error">
                                        Tarea no puede estar vacía!
                                </Alert>
                            </Fade>
                        }
            </div>
            </div>

        </>
    )
}

export default HomeScreen
