import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteAllTodo } from '../../features/todoSlice';
import { selectUserImg, setUserLogOut } from '../../features/userSlice';
import { auth } from '../../firebase';
import './signinsignout.css';

const SignInSignOut = () => {

    const name = useSelector(state =>state.user.userName);
    const history = useHistory();
    const dispatch = useDispatch();

    const photoURL = useSelector(selectUserImg);

    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(deleteAllTodo());
            dispatch(setUserLogOut());
            history.push('/');
        }).catch(error=>alert(error));
    }

    return (
        <div className="logout">
            <div className="title">
                <div className="img">
                   <img src={photoURL} alt="img user" />
                </div>
                <h2>Hola {name} !</h2>
            </div>
            <p onClick={signOut}>Cerrar Sesión</p>
        </div>
    )
}

export default SignInSignOut
