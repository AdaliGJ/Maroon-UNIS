import React, {useState, useEffect} from 'react';
import "./../Login/style.css";
import {Route, BrowserRouter as Router, Switch, Link, Redirect, useHistory} from "react-router-dom";
import data from "./../../data.js";

    const Login = () =>{
        
        const [user, setUser] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [emailError, setEmailError] = useState('');
        const [passwordError, setPasswordError] = useState('');
        const [hasAccount, setHasAccount] = useState(false);

        const history = useHistory();
  
        const clearInputs = () =>{
          setEmail('');
          setPassword('');
        }
  
        const clearErrors = () =>{
          setEmailError('');
          setPasswordError('');
        }
  
        const handleLogin = () =>{
          clearErrors();
          data
            .signInWithEmailAndPassword(email, password)
            .catch(err =>{
              switch(err.code){
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                  setEmailError(err.message);
                  break;
                case "auth/wrong-password":
                  setPasswordError(err.message);
                  break;
              }
            });

        };

        const authListener = () =>{
            data.onAuthStateChanged(user =>{
              if(user){
                clearInputs();
                setUser(user);
                history.push("/home");
              }
              else{
                setUser('');
              }
            });
          };
    
          useEffect(() =>{
            authListener();
          },[])


      return(
	    <section className="login">
            <div className="loginForm">
                <h1>Iniciar Sesión</h1> 
                <label>E-mail</label>
                <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <p className="errorMsg">{emailError}</p>
                <label>Contraseña</label>
                <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <p className="errorMsg">{passwordError}</p>
                <div className="boton">
                    <button id="login" onClick={handleLogin}>Iniciar Sesión</button>
                    <p>¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
                </div>
            </div>
        </section>
	    );
    };

export default Login;