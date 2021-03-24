import React, {useState, useEffect, Component} from 'react';
import "./style.css";
import data, {database} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";

const Post = ({nombre, carrera, fecha, correo, texto, foto, hora, postingImage}) => {

        return(
            <section className="post">
                <div className='publicaciones'>
                    <img src={foto || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} alt="Foto de perfil"/>
                    <h3 value={nombre}></h3>
                    <h7>{correo}</h7>
                    <p>{fecha}, {hora}</p>
                    <textarea className='cuerpo' readOnly value={texto}></textarea>
                    <img src={postingImage || null} alt="Foto de post"/>
                </div>
            </section>
    );
 
}

export default Post;