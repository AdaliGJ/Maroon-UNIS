import React from 'react';
import "./style.css";
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';

const Chat = () => {

    return(
    <section className="chat">
            <Navbar/>
            <h3>Mensajes</h3>
    </section>
    );
}

export default Chat;