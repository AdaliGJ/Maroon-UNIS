import React from 'react';
import "./style.css";
import data from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';

const Wall = () => {

    return(
    <section className="wall">
        <Navbar/>
        <h3>Mi Muro</h3>
        <div><p>Hola</p></div>
    </section>
    );
}

export default Wall;