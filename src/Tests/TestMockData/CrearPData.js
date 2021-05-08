import {React, useState, useEffect} from 'react';
import firebase from 'firebase';
import "./../CrearP/style.css";
import data from "./../../data.js";
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Registro from "./../Registro/registro.js";
import {database, storage, db} from "./../../data.js";
import ImageUpload from "./../../componentes/UploadImage/ImageUpload.js";

const CrearP = () => {
    
    const history = useHistory();
	
	
	const [usuarioTest, setUsuarioTest]=useState('12345');
    const [name,setName] = useState('');
	const [carnet,setCarnet] = useState('');
	const [carrera,setCarrera] = useState('');
	const [fecha,setFecha] = useState('');
	const [correo, setCorreo]= useState(data.currentUser.email);
	const [facultad, setFacultad]=useState('');
	const [uid, setUid] = useState(usuarioTest);
	const [foto, setFoto] = useState('https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d')
	

	const pushObj = () =>{

		var usersRef = database.ref('/usuarios/' + usuarioTest);
		usersRef.set({
			Nombre: name,
			Carnet: carnet,
			Carrera: carrera,
			Fecha_nacimiento: fecha,
			Correo: correo,
			Facultad: facultad,
			UID: uid
		},
		err =>{
			if(err)
				console.log(err)
		})
	}

	
	const handleLogout = () =>{
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
				            <label data-testid='nombre'>Nombre Completo</label><br/>
				            <input type="text" data-testid='nombrein' required value={name} onChange={(e)=>setName(e.target.value)}/><br/>
				            <label data-testid='carnet'>Número de Carnet</label><br/>
				            <input data-testid='carnetin' type="text" required value={carnet} onChange={(e)=>setCarnet(e.target.value)}/><br/>
				            <label data-testid='carrera'>Carrera</label><br/>
				            <input data-testid='carrerain' type="text" required value={carrera} onChange={(e)=>setCarrera(e.target.value)}/><br/>
				            <label data-testid='fecha'>Fecha de Nacimiento</label><br/>
				            <input data-testid='fechain' type="date" required value={fecha} onChange={(e)=>setFecha(e.target.value)}/><br/>
				            <label data-testid='correo'>Correo Electrónico</label><br/>
				            <input data-testid='correoin' type="text" required value={correo} onChange={(e)=>setCorreo(e.target.value)} readOnly/><br/>
				            <select data-testid='facultad' name="Facultad" id="nav" onChange={(e)=>setFacultad(e.target.value)}>
								<option data-testid='nulo' value="nulo">Facultad</option>
						        <option data-testid="ing" value="Ingeniería">Ingeniería</option>
								<option data-testid="hum" value="Humanidades">Humanidades</option>
								<option data-testid="der" value="Derecho">Derecho</option>
								<option data-testid="com" value="Comunicación">Comunicación</option>
								<option data-testid="ccee" value="Ciencias Económicas">Ciencias Económicas</option>
								<option data-testid="salud" value="Ciencias de la Salud">Ciencias de la Salud</option>
								<option data-testid="farq" value="Arquitectura y Diseño">Arquitectura y Diseño</option>
			                </select>
				            <button data-testdi='guardar' onClick={handleLogout}>Guardar cambios</button>
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