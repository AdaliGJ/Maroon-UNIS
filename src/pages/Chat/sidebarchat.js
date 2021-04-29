import React, {useEffect, useState} from 'react'
import './sidebarchat.css';
import * as CgIcons from 'react-icons/cg';
import data, {database} from './../../data.js';

function Sidebarchat({name, id, key}) {


    const createChat =()=>{}

    useEffect(() => {
        
    }, [])

    return (
        <section className="sidebarchat">
            <img src='https://firebasestorage.googleapis.com/v0/b/maroon-fc3ba.appspot.com/o/perfil%2Fdefault.jpg?alt=media&token=18c8df68-dfee-468a-829c-88fe66e3272d'width='40px' height='40px'/>
            <div className='sidebarchat__info'>
                <h2>{name}</h2>
                <p>Last message...</p>
            </div>
        </section>
    )
}

export default Sidebarchat
