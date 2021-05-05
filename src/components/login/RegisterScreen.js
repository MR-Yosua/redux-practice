import React, { useState } from 'react'
import "./register.css";
import Alert from '@material-ui/lab/Alert';
import {auth} from '../../firebase';
import { setActiveUser } from '../../features/userSlice';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';

const RegisterScreen = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(false);

    const confirmAndRegister = () => {
        if(password1 && password1===password2){
            
            auth.createUserWithEmailAndPassword(email, password1).then((userAuth) =>{
                let user = userAuth.user 
                // console.log(user.email);
                dispatch( setActiveUser({
                    userName:name,
                    userEmail:user.email,
                }))
                history.push('/home');
            }).catch((error) =>alert(error));
            
        }else{
            console.log('not equals');
            setError(!error);
        }
    }
    

    return (
        <div className="main-container">
            <div className="register-container">
                <div className="title">
                    <h2>Regístrate con Email o Google</h2>
                </div>
                <div className="form-container">
                    <form>
                    <div className="input-field">
                            <input 
                                type="text" 
                                className="input name" 
                                placeholder="Insert Name" 
                                value={name}
                                onChange={(text)=>{
                                    setName(text.target.value)
                                }}
                            />
                        </div>

                        <div className="input-field">
                            <input 
                                type="text" 
                                className="input email" 
                                placeholder="Insert Email" 
                                value={email}
                                onChange={(text)=>{
                                    setEmail(text.target.value)
                                }}
                            />
                        </div>

                        <div className="input-field">
                            <input 
                                type="password" 
                                className="input password" 
                                placeholder="Insert Password" 
                                value={password1}
                                onChange={(text)=>{
                                    setPassword1(text.target.value);
                                }}
                            />
                        </div>
                        
                        <div className="input-field">
                            <input 
                                type="password" 
                                className="input password" 
                                placeholder="Confirm Password" 
                                value={password2}
                                onChange={(text)=>{
                                    setPassword2(text.target.value);
                                }}
                            />
                        </div>
                    </form>
                    {
                        error && 
                        <Alert variant="filled" severity="error">
                                Passwords deben ser iguales
                        </Alert>
                    }

                    <div className="alert" style={{height:10}}></div>
                    {/* 
                    <div className="icons">
                        <i className="fab fa-google"></i>
                        <p>Registrate con google</p>
                    </div> */}

                    <div 
                        className="btn-register"
                        onClick={confirmAndRegister}
                    >
                        <p>Registrarse</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen
