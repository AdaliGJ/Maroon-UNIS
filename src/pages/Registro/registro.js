import React, {useState, useEffect} from 'react';
import "./style.css";
import data from "./../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory, Redirect} from "react-router-dom";

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
                  setUser('');
                }
              });
            };


            useEffect(() =>{
              authListener();
            },[])
      

      return(
	    <section className="signup">
            <div className="signupForm">
                <h1>Registrarse</h1>
                <label>E-mail</label>
                <input type="email" id="correo" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <p className="errorMsg">{emailError}</p>
                <label>Contraseña</label>
                <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <p className="errorMsg">{passwordError}</p>
                <div className="boton">
                    <button onClick={handleSignUp}>Registrarse</button>
                    <p>¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link></p>
                </div>
            </div>
        </section>
	    );
    };

export default Registro;