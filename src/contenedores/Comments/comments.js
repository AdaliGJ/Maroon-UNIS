import React, {useState, useEffect} from 'react';
import "./style.css";
import data, {database, storage} from "./../../data.js";
import * as AiIcons from 'react-icons/ai';


const Comments = () => {

	const [foto, setFoto]=useState('');
    const [escribir,setEscribir] = useState(false);

    const showEscribir = () => setEscribir(!escribir);

	const userId = data.currentUser.uid;

    const [texto,setTexto] = useState('');
    const [postingImage, setPostingImage] = useState('');

    const handleChange = e => {
        if(e.target.files[0]){
           const image = e.target.files[0];
           setPostingImage(() => ({image}));
        }
    }

    const handleUpload = () => {
        const {image} = postingImage;
        const uploadTask = storage.ref(`post/${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot)=>{
        }, 
        (error) => {
            //error function
           console.log(error);
        }, 
        ()=>{
            //complete function
            storage.ref('post').child(image.name).getDownloadURL().then(url => {
                console.log(url);
                setPostingImage(url);
            })
        });
    }

    const borrar = () =>{
        setTexto('');
        showEscribir();
        setPostingImage('');
    }

    const publicacion = () =>{
        pushObj();
        setTexto('');
        showEscribir();
        setPostingImage('');
    }

    const [name,setName] = useState('');
	const [carrera,setCarrera] = useState('');
	const [fecha,setFecha] = useState('');
	const [correo, setCorreo]= useState(data.currentUser.email);
    const [hora, setHora]= useState('');





    const pushObj = () =>{
		var usersRef = database.ref(`comentarios/${data.currentUser.uid}`);
		usersRef.push({
			Nombre: name,
			Fecha_publicación: fecha,
			Correo: correo,
            Cuerpo: texto,
			Foto: foto,
            Imagen_Post: postingImage,
            Hora: hora
		},
		err =>{
			if(err)
				console.log(err)
		});
	}

    const tiempo = new Date();
    const time = tiempo.getHours().toString() + ':' + tiempo.getMinutes().toString() + ':' + tiempo.getSeconds().toString();

	useEffect(() => {
        var recentPostsRef = database.ref('/usuarios/'+ userId);
    	recentPostsRef.once('value').then((snapshot) => {
      	console.log(snapshot.val());
		setCarrera(snapshot.val().Carrera);
		setName(snapshot.val().Nombre);
        setFecha(new Date().toDateString());
        setHora(time);
    });
		var fotoRef = database.ref('/foto_perfil/' + userId);
		fotoRef.once('value').then((snapshot)=>{
		console.log(snapshot.val());
		setFoto(snapshot.val().Foto);
	});
	}, [])
    
    return(
    <section className="comments">
        <div className={escribir ? 'escribir' :  "publicar"}>
            <img src={foto || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} alt="Foto de perfil"/>
            <button className='pensamiento' onClick={showEscribir}>Publica algo en tu muro</button>
            <textarea className='cuerpo' value={texto} placeholder='Escribe algo...' onChange={(e)=>setTexto(e.target.value)}></textarea>
            <button className='cancelar' onClick={borrar}>Cancelar</button> 
            <button className='postear' onClick={publicacion}>Publicar</button>
        </div>
    </section>
    );
}

export default Comments;