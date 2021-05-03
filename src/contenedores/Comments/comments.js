import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import * as AiIcons from 'react-icons/ai';
import Likes from './../../contenedores/Likes/likes.js';


function Comments ({username, caption, foto})  {
    var [comment, setComment]=useState(false);

    var [comentario, setComentario]=useState('');


    const commentPost =()=>setComment(!comment);    
   

    return(
    <section className="comment">
        <p>
            <img src={foto? foto : 'https:firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'}></img>
           <span>
                {username}: &nbsp;    
            </span> 
            {caption}
        </p>
    </section>
    );
}

export default Comments;