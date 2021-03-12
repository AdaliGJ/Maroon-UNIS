import React from 'react';
import "./style.css";
import data from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';

const Wall = () => {

    return(
    <section className="wall">
        <nav>
            <h3>Muro</h3>
        </nav>  
    </section>
    );
}

export default Wall;