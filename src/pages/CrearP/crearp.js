import {React, useState} from 'react';
import firebase from 'firebase';
import "./../CrearP/style.css";
import data from "./../../data.js";
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Registro from "./../Registro/registro.js";
import {db} from "./../../data.js";

const CrearP = () => {
    
    const history = useHistory();

	const initialValues ={
		firstName: '',
		secondName: '',
		lastName1: '',
		lastName2: '',
		correo: data.currentUser.email
	};

	var [values, setValues]=useState(initialValues);

    const handleLogout = () =>{
        data.signOut();
        history.push("/login");
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
				            <input type="text" value={values.firstName} onChange={handleInputChange}/><br/>
				            <label>Segundo Nombre</label><br/>
				            <input type="text" value={values.secondName} onChange={handleInputChange}/><br/>
				            <label>Primer Apellido</label><br/>
				            <input type="text" value={values.lastName1} onChange={handleInputChange}/><br/>
				            <label>Segundo apellido</label><br/>
				            <input type="text" value={values.lastName2} onChange={handleInputChange}/><br/>
				            <label>Correo Electrónico</label><br/>
				            <input type="text" value={values.correo} onChange={handleInputChange}/><br/>
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