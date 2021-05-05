import React from 'react'
import {auth} from '../../firebase';
import { useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { setUserLogOut } from '../../features/userSlice';
import './homescreen.css';

const HomeScreen = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const name = useSelector(state =>state.user.userName);

    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(setUserLogOut())
            history.push('/');
        }).catch(error=>alert(error));
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

                    <div className="items-container">

                    </div>

                    <div className="input-container">
                        <input  type="text"/>

                    </div>
            </div>
            </div>

        </>
    )
}

export default HomeScreen
