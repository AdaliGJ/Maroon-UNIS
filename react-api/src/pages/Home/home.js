import React from 'react';
import "./style.css";
import data from "./../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';

const Home = () => {
    const history = useHistory();

    const handleLogout = () =>{
        data.signOut();
        history.push("/login");
    };



    return(
    <section className="home">
        <Navbar/>   
    </section>
    );
}

export default Home;