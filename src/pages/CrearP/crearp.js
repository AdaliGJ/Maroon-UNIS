import {React, useState} from 'react';
import firebase from 'firebase';
import "./../CrearP/style.css";
import data from "./../../data.js";
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Registro from "./../Registro/registro.js";
import {database, storage} from "./../../data.js";
import ImageUpload from "./../../componentes/UploadImage/ImageUpload.js";

const CrearP = () => {
    
    const history = useHistory();
	
	
	const [name,setName] = useState('');
	const [carnet,setCarnet] = useState('');
	const [carrera,setCarrera] = useState('');
	const [fecha,setFecha] = useState('');
	const [correo, setCorreo]= useState(data.currentUser.email);
	const [facultad, setFacultad]=useState('');
	

	const pushObj = () =>{
		var usersRef = database.ref(`usuarios/${data.currentUser.uid}`);
		usersRef.set({
			Nombre: name,
			Carnet: carnet,
			Carrera: carrera,
			Fecha_nacimiento: fecha,
			Correo: correo,
			Facultad: facultad,
		},
		err =>{
			if(err)
				console.log(err)
		});
	}

	
	const handleLogout = () =>{
        data.signOut();
        history.push("/login");
		pushObj();
    };

    return(
        <section className="crear">
        <header>
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
				            <select name="Facultad" id="nav" onChange={(e)=>setFacultad(e.target.value)}>
								<option value="nulo">Facultad</option>
						        <option value="Ingeniería">Ingeniería</option>
								<option value="Humanidades">Humanidades</option>
								<option value="Derecho">Derecho</option>
								<option value="Comunicación">Comunicación</option>
								<option value="Ciencias Económicas">Ciencias Económicas</option>
								<option value="Ciencias de la Salud">Ciencias de la Salud</option>
								<option value="Arquitectura y Diseño">Arquitectura y Diseño</option>
			                </select>
				            <button onClick={handleLogout}>Guardar cambios</button>
			            </form>
		            </div>
                </div>
		    </div>
            <footer>
	        </footer>
        </section>
        );
}

export default CrearP;