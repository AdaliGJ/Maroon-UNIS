 import React, {Component} from 'react';
 import {storage} from './../../data.js';
 import "./imageU.css"

 class ImageUpload extends Component {
     constructor(props){
         super(props);
         this.state = {
            image: null,
            url: ''
         }
         this.handleChange = this.handleChange.bind(this);
         this.handleUpload = this.handleUpload.bind(this);
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
             })
         });
     }

     render(){
         return(
             <section className="upload">
                <div class="image-upload">
                    <label for="file-input">
                        <img src={this.state.url || 'https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'} alt="Foto de perfil"/>
                    </label>
                    <input id="file-input" type="file" onChange={this.handleChange}/>
                    <button onClick={this.handleUpload}>Subir Fotografía Seleccionada</button>
                </div>
             </section>
         )
     }
 }

 export default ImageUpload;