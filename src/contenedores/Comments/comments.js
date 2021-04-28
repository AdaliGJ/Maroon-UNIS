import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import * as AiIcons from 'react-icons/ai';
import Likes from './../../contenedores/Likes/likes.js';


function Comments ({username, caption})  {

   

    return(
    <section className="comment">
        <p>
           <span>
                {username}   
            </span> 
            {caption}
        </p>
    </section>
    );
}

export default Comments;