import React from 'react';
import "./style.css";
import data from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import * as FaIcons from 'react-icons/fa';

const Buscar = () => {

    return(
    <section className="search">
            <Navbar/>
            <h3>Buscar</h3>
            <div className='buscador'>
                <FaIcons.FaSearch style={{fill: 'black'}}/>
                <input className='buscador_input' placeholder='Buscar...' type='text'/>
            </div>

            <div className='resultados'>
                <img className='perfil' src='https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'></img>
                <h5>Nombre</h5>
                <h7>Correo</h7>
                <h7>Carrera</h7>
                <h7>Carnet</h7>
            </div>
    </section>
    );
}

export default Buscar;