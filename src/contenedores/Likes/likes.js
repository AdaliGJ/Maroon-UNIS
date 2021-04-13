import React, {Component} from 'react';
import data, {storage, database} from './../../data.js';


class MostrarComentarios extends Component {
    constructor(props){
        super(props);
        this.state = {
           perfil: data.currentUser.uid,
           cuerpo: '',
           fecha: '',
           hora:'',
           texto: ''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    getCuerpo = (post)=>{
        const key = Object.getKey(post);
    }

    handleChange = e => {
        if(e.target.files[0]){
            const image = e.target.files[0];
           this.setState(() => ({image}));
        }
    }

    handleUpload = () => {
        const {image} =this.state;
        const uploadTask = storage.ref(`perfil/${image.name}`).put(image);
        uploadTask.on('state_changed', 
        (snapshot)=>{
           //Progress function
           const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
           this.setState({progress});
        }, 
        (error) => {
            //error function
           console.log(error);
        }, 
        ()=>{
            //complete function
            storage.ref('perfil').child(image.name).getDownloadURL().then(url => {
                console.log(url);
                this.setState({url});
                database.ref(`foto_perfil/${data.currentUser.uid}`).set({
                   Foto: url
                })
            })
        });
    }
    
    render(){
        return(
            <section className="upload">

            </section>
        )
    }
}

export default MostrarComentarios;