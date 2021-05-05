import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database} from "./../../data.js"
import {Route, MemoryRouter, Switch, Link, useHistory, Redirect} from "react-router-dom";

    const Registro = () =>{

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

            const iraLogin = ()=>{
              history.push("/login")
            }
      
            const handleSignUp = () =>{
              clearErrors();
              data
                .createUserWithEmailAndPassword(email, password)
                .catch(err =>{
                  switch(err.code){
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                      setEmailError(err.message);
                      break;
                    case "auth/weak-password":
                      setPasswordError(err.message);
                      break;
                }
              });
            }
      
            const authListener = () =>{
              data.onAuthStateChanged(user =>{
                if(user){
                  clearInputs();
                  setUser(user);
                  history.push("/crear-perfil");
                }
                else{
                  //setUser('');
                }
              });
            };


            useEffect(() =>{
              authListener();
            },[])
      

      return(
	    <section className="signup">
            <div className="signupForm" data-testid='signupform'>
                <h1 data-testid='registrarse'>Registrarse</h1>
                <label data-testid='email'>E-mail</label>
                <input type="email" id="correo" required value={email} data-testid='correo' onChange={(e)=>setEmail(e.target.value)}/>
                <p className="errorMsg" data-testid='error'>{emailError}</p>
                <label data-testid='contra'>Contraseña</label>
                <input type="password" data-testid='password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <p className="errorMsg" data-testid='errorMsg'>{passwordError}</p>
                <div className="boton" data-testid='boton'>
                    <button onClick={handleSignUp} data-testid='registro'>Registrarse</button>
                    <p data-testid='login'>¿Ya tienes una cuenta? <span onClick={iraLogin}>Inicia sesión</span> </p>
                </div>
            </div>
        </section>
	    );
    };

export default Registro;