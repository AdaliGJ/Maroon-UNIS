import React from 'react';
import "./style.css";
import data from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';

const Buscar = () => {

    return(
    <section className="search">
        <h1>Search</h1> 
    </section>
    );
}

export default Buscar;