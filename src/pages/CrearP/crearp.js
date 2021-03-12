import {React, useState} from 'react';
import "./../CrearP/style.css";
import data from "./../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import Registro from "./../Registro/registro.js";

const CrearP = () => {
    
    const history = useHistory();


    const handleLogout = () =>{
        data.signOut();
        history.push("/login");
    };
    function menu(){
        ("#menu").menu();
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
				            <input type="text" /><br/>
				            <label>Segundo Nombre</label><br/>
				            <input type="text" /><br/>
				            <label>Primer Apellido</label><br/>
				            <input type="text" /><br/>
				            <label>Segundo apellido</label><br/>
				            <input type="text" /><br/>
				            <label>Correo Electrónico</label><br/>
				            <input type="text" /><br/>
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