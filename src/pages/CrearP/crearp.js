import {React, useState} from 'react';
import firebase from 'firebase';
import "./../CrearP/style.css";
import data from "./../../data.js";
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Registro from "./../Registro/registro.js";
import {database} from "./../../data.js";

const CrearP = () => {
    
    const history = useHistory();

	const initialValues ={
		firstName: '',
		secondName: '',
		lastName1: '',
		lastName2: '',
		correo: data.currentUser.email
	};
	const [firstName,setFirstName] = useState('');
	const [secondName,setSecondName] = useState('');
	const [lastName1,setLastName1] = useState('');
	const [lastName2,setLastName2] = useState('');
	const [correo, setCorreo]= useState(data.currentUser.email);     

	var [values, setValues]=useState(initialValues);

    const addOrEdit = obj =>{
		database.ref().child('usuarios').push(
			obj,
			err =>{
				if(err)
					console.log(err)
			}
		)
	}
	
	const handleLogout = () =>{
        data.signOut();
        history.push("/login");
		addOrEdit(values);
    };

	const handleInputChange = e => {
		var [name, value] = e.target
		setValues({
			...values,
			[name]: value
		})
	};
    
    return(
        <section className="crear">
        <header>
        </header>
            <div className="bodyDiv">
                <div className="formulario">
                    <div>
                        <form>
				            <label>Primer Nombre</label><br/>
				            <input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/><br/>
				            <label>Segundo Nombre</label><br/>
				            <input type="text" value={secondName} onChange={(e)=>setSecondName(e.target.value)}/><br/>
				            <label>Primer Apellido</label><br/>
				            <input type="text" value={lastName1} onChange={(e)=>setLastName1(e.target.value)}/><br/>
				            <label>Segundo apellido</label><br/>
				            <input type="text" value={lastName2} onChange={(e)=>setLastName2(e.target.value)}/><br/>
				            <label>Correo Electrónico</label><br/>
				            <input type="text" value={correo} onChange={(e)=>setCorreo(e.target.value)}/><br/>
				            <select name="Universidad" id="nav">
								<option value="Escoger universidad">Escoger Universidad</option>
						        <option value="Universidad del Istmo">Universidad del Istmo</option>
								<option value="Universidad del Valle">Universidad del Valle</option>
								<option value="San Carlos Guatemala">San Carlos Guatemala</option>
								<option value="Rafael Landivar">Rafael Landivar</option>
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