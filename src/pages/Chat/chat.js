import React from 'react';
import "./style.css";
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';

const Chat = () => {

    return(
    <section className="chat">
        <nav>
            <h3>Mensajes</h3>
        </nav>
    </section>
    );
}

export default Chat;