import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database} from "./../../data.js";
import * as AiIcons from 'react-icons/ai';
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Navbar from '../../contenedores/Menu/NavBar';
import PostImage from './../../componentes/PostImage/PostImage.js';
import { IconContext } from 'react-icons/lib';

const Posting = () => {

	const [foto, setFoto]=useState('');
    const [escribir,setEscribir] = useState(false);

    const showEscribir = () => setEscribir(!escribir);

	const userId = data.currentUser.uid;

    const [texto,setTexto] = useState('');
    const [postingImage, setPostingImage] = useState('');

    const borrar = () =>{
        setTexto('');
        showEscribir();
    }

    const publicacion = () =>{
        pushObj();
        setTexto('');
        showEscribir();
    }

    const [name,setName] = useState('');
	const [carrera,setCarrera] = useState('');
	const [fecha,setFecha] = useState('');
	const [correo, setCorreo]= useState(data.currentUser.email);
    const [hora, setHora]= useState(data.currentUser.email);

    const pushObj = () =>{
		var usersRef = database.ref(`posts/${data.currentUser.uid}`);
		usersRef.push({
			Nombre: name,
			Carrera: carrera,
			Fecha_publicación: fecha,
			Correo: correo,
            Cuerpo: texto,
			Foto: foto,
            Hora: hora,
            Imagen_Post: postingImage
		},
		err =>{
			if(err)
				console.log(err)
		});
	}


	useEffect(() => {
        var recentPostsRef = database.ref('/usuarios/'+ userId);
    	recentPostsRef.once('value').then((snapshot) => {
      	console.log(snapshot.val());
		setCarrera(snapshot.val().Carrera);
		setName(snapshot.val().Nombre);
        setFecha(new Date().toDateString());
    });
		var fotoRef = database.ref('/foto_perfil/' + userId);
		fotoRef.once('value').then((snapshot)=>{
		console.log(snapshot.val());
		setFoto(snapshot.val().Foto);
	});
	}, [])
    
    return(
    <section className="posts">
        <div className={escribir ? "publicar": 'escribir'}>
            <label for="file-input">
                <img src={foto || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} alt="Foto de perfil"/>
            </label>
            <button className='pensamiento' onClick={showEscribir}>Publica algo en tu muro</button>
            <textarea className='cuerpo' value={texto} placeholder='Escribe algo...' onChange={(e)=>setTexto(e.target.value)}></textarea>
            <button className='postear' onClick={publicacion}>Publicar</button>
            <button className='cancelar' onClick={borrar}>Cancelar</button>
            <div className='extras'>
                <button className='imagen'><AiIcons.AiOutlinePicture size={20} style={{ fill: '#800000' }}/> Subir una imagen</button>
            </div>
        </div>
      
    </section>
    );
}

export default Posting;