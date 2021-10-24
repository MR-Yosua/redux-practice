import React, { useEffect, useState } from 'react'
import './login.css';
import {useHistory} from 'react-router-dom';
import {auth,provider,db} from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveUser} from '../../features/userSlice';
import Alert from '@material-ui/lab/Alert';


const LoginScreen = () => {
    

    const [error, setError] = useState(false);
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');

    
    const dispatch = useDispatch();
    
    const history = useHistory();
   
    const authenticaded = useSelector(state=>state.user.userEmail);
    
    useEffect(() =>{
        if(authenticaded !== null){
            history.push('/home');
        }
    },[history,authenticaded] );


    const signIn = () => {
        auth.signInWithEmailAndPassword(email,password).then((result) => {
            
            dispatch(setActiveUser({
                uid:result.user.uid,
                userName: result.user.displayName,
                userEmail:result.user.email,
                photoURL: result.user.photoURL
            }))
            

            //create users database on firebase
            db.collection('users').doc(result.user.uid).set({
                uid:result.user.uid,
                userName: result.user.displayName,
                userEmail:result.user.email,
                photoURL: result.user.photoURL
            });

            
            history.push('/home');

       }).catch(
            setError(true)
        );
    }
    
    const register = () => {
        history.push('/register');
    }
    
    const SignInWithGoogle = async() => {

            await auth.signInWithPopup(provider).then((result) =>{
                dispatch(setActiveUser({
                    uid:result.user.uid,
                    userName: result.user.displayName,
                    userEmail: result.user.email,
                    photoURL: result.user.photoURL
                }))
                //create users database on firebase
                db.collection('users').doc(result.user.uid).set({
                    uid:result.user.uid,
                    userName: result.user.displayName,
                    userEmail:result.user.email,
                    photoURL: result.user.photoURL
                });
                  
                history.push('/home');
    
            } ).catch(error=>{
                setError(true);
                console.log("Error 3 antes");
                setTimeout(()=>{setError(false)},5000);
                console.log("Error 3 despues");
            });
    }
    


    return (
        <div className="main-container">
            <div className="login-container">
                <div className="login-title">
                    <h2>Iniciar Sesión TodoAPP</h2> 
                </div>
                <div className="form-container">
                    <form onSubmit={signIn}>
                        <div className="input-field">
                            <input 
                                type="text"
                                placeholder="Correo"
                                value={email}
                                onChange={(text)=>setEmail(text.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input 
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(text)=>setPassword(text.target.value)}
                            />
                        </div>

                        {
                            error && 
                            <Alert variant="filled" severity="error">
                                    Problemas con Credenciales
                            </Alert>
                        }


                        <div className="icons" onClick={SignInWithGoogle}>
                                <i className="fab fa-google"></i>
                                <p>Iniciar con Google</p>
                        </div>

                        <div className="btn-section">
                            <div className="btn" onClick={signIn}>
                                Iniciar Sesión
                            </div>
                            <div className="btn" onClick={register} >
                                Registrarse
                            </div>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    )
}

export default LoginScreen
