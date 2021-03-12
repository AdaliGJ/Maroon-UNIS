import {React, useState} from 'react';
import "./style.css";
import data from "../../data.js"
import {storage} from "../../data.js"
import {Route, BrowserRouter as Router, Switch, Link, useHistory} from "react-router-dom";
import "firebase/storage"; 
import firebase from 'firebase';


const Perfil = () => {
    
    const history = useHistory();

    const handleLogout = () =>{
        data.signOut();
        history.push("/login");
    };

    const [image, setImage] = useState(null);
    const [url, setUrl]=useState("");

      
    const handleChange = e => {
        if (e.target.files[0]) {
        setImage(e.target.files[0]);
        }
    };
    
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot =>{},
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.new)
                    .getDownloadURL()
                    .then(url =>{
                        setUrl(url);
                });
            }
        );
    };
      
    console.log("image: ", image);
    
    return(
        <section className="perfil">
            <nav>
                <h3>Perfil</h3>
                <button onClick={handleLogout}>Guardar cambios</button>
            </nav>
            <div>
                <input type="file" onChange={handleChange}/>
                <br/>
                <button onClick={handleUpload}>Subir</button>
                <br/>
                {url}
            </div>
        </section>
        );
}

export default Perfil;