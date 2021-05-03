import React, { useEffect, useState } from 'react';
import "./style.css";
import data, {db, database} from "./../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import Posting from './../Posting/posting.js';
import Post from './../../contenedores/Post/post.js';


const Home = () => {
    const history = useHistory();

    const handleLogout = () =>{
        data.signOut();
        history.push("/login");
    };

    const [name,setName] = useState('');
    const [carnet,setCarnet] = useState('');
    const [carrera,setCarrera] = useState('');
    const [fecha,setFecha] = useState('');
    const [correo, setCorreo]= useState(data.currentUser.email);
    const [facultad, setFacultad]=useState('');
    const [uid, setUid] = useState(data.currentUser.uid);



    const [posts, setPosts] = useState([]);
    const [fechaString, setFechaString]=useState('');
    const [seguidores, setSeguidores]=useState();
  

    useEffect(() => {
        db.collection('posts').orderBy('fecha_publicación', 'desc').onSnapshot(snapshot => {
          setPosts(snapshot.docs.map(doc => ({ id: doc.id, datos: doc.data()})))
        })
        
      }, [])



    return(
    <section className="home">
        <Navbar/>
        <Posting/>

        {posts.map(post => (
            <Post
                id={post.id}
                key={post.id}
                nombre={post.datos.nombre}
                foto={post.datos.foto}
                correo={post.datos.correo}
                texto={post.datos.cuerpo}
                fecha={post.datos.fecha_string}
                postingImage={post.datos.imagen_Post}
                carrera={post.datos.carrera}
                hora={post.datos.hora}
                comentarios={post.datos.comentarios}
      />
      ))} 
    </section>
    );
}

export default Home;