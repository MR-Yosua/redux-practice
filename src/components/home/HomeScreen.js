import React, { useEffect, useState } from 'react'
import {auth} from '../../firebase';
import { useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { setUserLogOut } from '../../features/userSlice';
import './homescreen.css';
import {addTodo, deleteAllTodo} from '../../features/todoSlice';
import TodoList from '../todo/TodoList';
import {selectTodo} from '../../features/todoSlice';
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';
const HomeScreen = () => {
    
    // const todos = useSelector(state=>state.todos.todoList);
    
    const todos = useSelector(selectTodo);


    const history = useHistory();
    const dispatch = useDispatch();

    const name = useSelector(state =>state.user.userName);
    
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    
    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(setUserLogOut());
            dispatch(deleteAllTodo());
            history.push('/');
        }).catch(error=>alert(error));
    }
    

    useEffect(() => {
        if(error){
            setTimeout(()=>{
                setError(!error);
            },1000)
        }
    }, [error])
    
    const saveTodo = () => {
        // console.log(`Adding ${input}`);

        if(input !== ''){

            dispatch(addTodo({
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
            <div className="logout">
                <h2>Hola {name} !</h2>
                <p onClick={signOut}>Cerrar Sesión</p>
            </div>
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
                                    <TodoList key={todo.id} item={todo.item} id={todo.id}/>
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
                            />
                            
                            <button
                                    onClick={saveTodo}    
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
