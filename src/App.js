import React, {useState, useEffect} from 'react';
import {Route, BrowserRouter as Router, Switch, Link, Redirect} from "react-router-dom";
import "./App.css";
import data from "./data.js";
import Login from "./pages/Login/login.js";
import Registro from "./pages/Registro/registro.js";
import Home from "./pages/Home/home.js";
import CrearP from './pages/CrearP/crearp.js';
import Perfil from './pages/Perfil/perfil.js';
import Chat from './pages/Chat/chat.js';
import Wall from './pages/Wall/wall.js';
import Buscar from './contenedores/Search/search.js';
import ImageUpload from './componentes/UploadImage/ImageUpload.js';

    const App = () =>{
      return(
        <Router>
	        <div className="App">
          </div>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route path="/registro" component={Registro}/>
            <Route path="/home" component={Home}/>
            <Route path="/crear-perfil" component={CrearP}/>
            <Route path="/perfil" component={Perfil}/>
            <Route path="/mensajes" component={Chat}/>
            <Route path="/mi-muro" component={Wall}/>
            <Route path="/buscar" component={Buscar}/>
            <Route path="/upload" component={ImageUpload}/>
            <Redirect path="/" to="/login"></Redirect>
          </Switch>
        </Router>  
	    );
};
    
export default App;

