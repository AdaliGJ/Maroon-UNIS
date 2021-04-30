import React from 'react';
import "./chat.css";
import {Route, BrowserRouter as Router, Switch, Link, useHistory, useParams} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import Sidebar from './sidebar.js';
import Mensajes from './mensajes';

const Chat = () => {

    const {chatId}=useParams();

    return(
    <section className="chat">
        <Navbar/>
        <div className="chat__body">
        <Router>
            <Sidebar/>
            <Switch>
                <Route path ='/mensajes/:chatId'>
                    <Mensajes/>
                </Route>
                <Route path ='/'>
                    <Mensajes/>
                </Route>
            </Switch>
        </Router>
        </div>
    </section>
    );
}

export default Chat;