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
import Follow from './contenedores/Follow/follow.js';
import EditarP from './pages/EditarP/editarp.js';
import { useStateValue } from './StateProvider';
import Like from './contenedores/Likes/likes.js'


    const App = () =>{
      return(
        <Router>
	        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route path="/registro" component={Registro}/>
            <Route path="/home" component={Home}/>
            <Route path="/crear-perfil" component={CrearP}/>
            <Route path="/perfil" component={Perfil}/>
            <Route path="/mensajes" component={Chat}/>
            <Route path="/mi-muro" component={Wall}/>
            <Route path="/buscar" component={Buscar}/>
            <Route path="/editar-perfil" component={EditarP}/>
            <Route path="/like" component={Like}/>
            <Redirect path="/" to="/login"></Redirect>
          </Switch>
          </div>
        </Router>  
	    );
};
    
export default App;

