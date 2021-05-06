import React, { useEffect, useState } from 'react';
import LoginScreen from './components/login/LoginScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomeScreen from './components/home/HomeScreen';
import RegisterScreen from './components/login/RegisterScreen';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { setActiveUser } from './features/userSlice';
import './App.css';

function App() {
  
  
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);
  const [checking, setChecking] = useState(true);

  const authenticaded = useSelector(state=>state.user.userEmail);

  useEffect(() => {
    auth.onAuthStateChanged(async (user)=>{
      if(user?.uid){
        dispatch(setActiveUser({
          uid:user.uid,
          userName: user.displayName,
          userEmail: user.email
        }))
        if(authenticaded !== null){
          setIsLogged(true);
        }else{
          setIsLogged(false);
        }
      }

      setChecking(false);
    })
  }, [dispatch,isLogged,authenticaded,setChecking])


  if(checking){
    return(
        <div className="loader-main">
          <div className="title-container">
            <h1>Loading ...</h1>
          </div>
          <div className="loader__preloader">
          </div>
        </div>
    )
  }

  return (
    <Router>
      <Switch>
        {
        isLogged &&
        <Route path="/home"> <HomeScreen/> </Route>
        }
        <Route exact path="/"> <LoginScreen/> </Route> 
        
        <Route path="/register"> <RegisterScreen/> </Route>
        <Redirect to="/"/>
        </Switch>      
      <div className="App">
      </div>
    </Router>
  );
}

export default App;
