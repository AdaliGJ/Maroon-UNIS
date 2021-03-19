import {React, useState, useEffect} from 'react';
import firebase from 'firebase';
import "./../EditarP/style.css";
import data from "./../../data.js";
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import {database, storage} from "./../../data.js";
import ImageUpload from "./../../componentes/UploadImage/ImageUpload.js";

const EditarP = () => {
    
    const history = useHistory();
	

	const [name,setName] = useState('');
	const [carnet,setCarnet] = useState('');
	const [carrera,setCarrera] = useState('');
	const [fecha,setFecha] = useState('');
	const [correo, setCorreo]= useState(data.currentUser.email);
	const [facultad, setFacultad]=useState('');
	const [foto, setFoto]=useState('');
	

	const pushObj = () =>{
		var usersRef = database.ref(`usuarios/${data.currentUser.uid}`);
		usersRef.set({
			Nombre: name,
			Carnet: carnet,
			Carrera: carrera,
			Fecha_nacimiento: fecha,
			Correo: correo,
			Facultad: facultad
		},
		err =>{
			if(err)
				console.log(err)
		});
	}

	
	const handleChange = () =>{
        history.push("/perfil");
		pushObj();
    };

    const handleCancel = () =>{
        history.push("/perfil");
    };

	const userId = data.currentUser.uid;

	useEffect(() => {
		var recentPostsRef = database.ref('/usuarios/'+ userId);
    	recentPostsRef.once('value').then((snapshot) => {
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
        <section className="crear">
        <header>
           <h2>Editar perfil</h2>
        </header>
            <div className="bodyDiv">
                <div className="formulario">
                    <div>
						<ImageUpload/>
                        <form>
				            <label>Nombre Completo</label><br/>
				            <input type="text" required value={name} onChange={(e)=>setName(e.target.value)}/><br/>
				            <label>Número de Carnet</label><br/>
				            <input type="text" required value={carnet} onChange={(e)=>setCarnet(e.target.value)}/><br/>
				            <label>Carrera</label><br/>
				            <input type="text" required value={carrera} onChange={(e)=>setCarrera(e.target.value)}/><br/>
				            <label>Fecha de Nacimiento</label><br/>
				            <input type="date" required value={fecha} onChange={(e)=>setFecha(e.target.value)}/><br/>
				            <label>Correo Electrónico</label><br/>
				            <input type="text" required value={correo} onChange={(e)=>setCorreo(e.target.value)} readOnly/><br/>
				            <select name="Facultad" id="nav" required value={facultad} onChange={(e)=>setFacultad(e.target.value)}>
								<option value="nulo">Facultad</option>
						        <option value="Ingeniería">Ingeniería</option>
								<option value="Humanidades">Humanidades</option>
								<option value="Derecho">Derecho</option>
								<option value="Comunicación">Comunicación</option>
								<option value="Ciencias Económicas">Ciencias Económicas</option>
								<option value="Ciencias de la Salud">Ciencias de la Salud</option>
								<option value="Arquitectura y Diseño">Arquitectura y Diseño</option>
			                </select>
				            <button onClick={handleChange}>Guardar cambios</button>
                            <button onClick={handleCancel}>Cancelar</button>
			            </form>
		            </div>
                </div>
		    </div>
            <footer>
	        </footer>
        </section>
        );
}

export default EditarP;