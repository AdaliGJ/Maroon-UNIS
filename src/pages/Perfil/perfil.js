import {React, useState, useEffect} from 'react';
import firebase from 'firebase';
import "./style.css";
import "./../../contenedores/Menu/navbar.css";
import data from "./../../data.js";
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Registro from "./../Registro/registro.js";
import {database} from "./../../data.js";
import Navbar from '../../contenedores/Menu/NavBar';

const Perfil = () => {
    
    const history = useHistory();
	
	const [name,setName] = useState('');
	const [carnet,setCarnet] = useState('');
	const [carrera,setCarrera] = useState('');
	const [fecha,setFecha] = useState('');
	const [correo, setCorreo]= useState(data.currentUser.email);
	const [facultad, setFacultad]=useState('');
	const [foto, setFoto]=useState('');
	
	
	const makeChange = () =>{
        history.push("/editar-perfil");
    };

	const userId = data.currentUser.uid;


	useEffect(() => {
		var recentPostsRef = database.ref('/usuarios/'+ userId);
    	recentPostsRef.once('value').then((snapshot) => {
      	// snapshot.val() is the dictionary with all your keys/values from the '/store' path
      	console.log(snapshot.val());
		setCarrera(snapshot.val().Carrera);
		setName(snapshot.val().Nombre);
		setFacultad(snapshot.val().Facultad);
		setFecha(snapshot.val().Fecha_nacimiento);
		setCarnet(snapshot.val().Carnet);
    });
		var fotoRef = database.ref('/foto_perfil/' + userId);
		fotoRef.once('value').then((snapshot)=>{
		console.log(snapshot.val());
		setFoto(snapshot.val().Foto);
	});
	}, [])

    return(
        <section className="perfil">
        <header>
            <Navbar/> 
        </header>
            <div className="bodyDiv">
                <div className="formulario">
                    <div>
						<div class="image-upload">
                    		<label for="file-input">
                        		<img src={foto || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} alt="Foto de perfil"/>
                    		</label>
                		</div>
                        <form>
				            <label>Nombre Completo</label><br/>
				            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}readOnly/><br/>
				            <label>Número de Carnet</label><br/>
				            <input type="text" value={carnet} onChange={(e)=>setCarnet(e.target.value)}readOnly/><br/>
				            <label>Carrera</label><br/>
				            <input type="text" value={carrera} onChange={(e)=>setCarrera(e.target.value)}readOnly/><br/>
				            <label>Fecha de Nacimiento</label><br/>
				            <input type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)}readOnly/><br/>
				            <label>Correo Electrónico</label><br/>
				            <input type="text" value={correo} onChange={(e)=>setCorreo(e.target.value)} readOnly/><br/>
                            <label>Facultad</label><br/>
				            <input type ="text" value={facultad} onChange={(e)=>setFacultad(e.target.value)} readOnly/>
				            <button onClick={makeChange}>Editar perfil</button>
			            </form>
		            </div>
                </div>
		    </div>
            <footer>
	        </footer>
        </section>
        );
}

export default Perfil;
