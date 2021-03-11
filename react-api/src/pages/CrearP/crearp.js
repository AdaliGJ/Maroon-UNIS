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
				            <ul class="nav">
				                <li><a href="" className="universidades">Univerisdad</a>
					                <ul>
						                <li><a href="">Universidad del Istmo</a></li>
						                <li><a href="">Universidad del valle</a></li>
						                <li><a href="">San Carlos Guatemala</a></li>
						                <li><a href="">Rafael Landivar</a></li>
					                </ul>
				                </li>
			                </ul>
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