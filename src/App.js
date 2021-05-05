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


function App() {
  
  
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);

  const authenticaded = useSelector(state=>state.user.userEmail);

  useEffect(() => {
    auth.onAuthStateChanged(async (user)=>{
      if(user?.uid){
        dispatch(setActiveUser({
          userName: user.displayName,
          userEmail: user.email
        }))
        if(authenticaded !== null){
          setIsLogged(true);
        }else{
          setIsLogged(false);
        }
      }
    })
  }, [dispatch,isLogged,authenticaded])


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
