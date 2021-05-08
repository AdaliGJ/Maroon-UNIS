import React from 'react';
import {render, fireEvent, queryByText, getByTestId} from '@testing-library/react';
import PostData from './TestMockData/PostData.js';



it("render correcto", () => {
    const {queryByTestId} = render(<PostData/>)

    expect(queryByTestId('foto')).toBeTruthy();
    expect(queryByTestId('nombre')).toBeTruthy();
    expect(queryByTestId('fecha')).toBeTruthy();
    expect(queryByTestId('cuerpo')).toBeTruthy();
    expect(queryByTestId('postimg')).toBeTruthy();
    expect(queryByTestId('likecomment')).toBeTruthy();
    expect(queryByTestId('icons2')).toBeTruthy();
    expect(queryByTestId('icon2')).toBeTruthy();
    expect(queryByTestId('haycomentarios')).toBeTruthy();
    expect(queryByTestId('comment')).toBeTruthy();
    expect(queryByTestId('comentario')).toBeTruthy();
    expect(queryByTestId('correo')).toBeTruthy();
   
})

describe('valor input', () =>{
    it('cambia al escribir', ()=>{
        const {queryByPlaceholderText}=render(<PostData/>)

        const input = queryByPlaceholderText('Escribe algo...');

        fireEvent.change(input,{target :{value: 'prueba'}});

        expect(input.value).toBe('prueba');
    })
})

it("valores correctos", () => {
    const {queryByTestId, getByText} = render(<PostData
        nombre='Adalí Garrán'
        fecha='fecha'
        correo='adaligaji@hotmail.com'
        texto='Hola'
        foto='https://i.pinimg.com/originals/19/87/90/198790eb7e08830027c1ae1686496c72.png'
        postingImage='https://www.luisan.net/blog/wp-content/uploads/2014/09/color_small_mk-e1549454603143.png'
        carrera='Sistemas'
        hora='Hora'/>)

    expect(getByText('Publicado: fecha, Hora')).toBeTruthy();
    expect(getByText('Adalí Garrán', <a>Sistemas</a>)).toBeTruthy();
    expect(getByText('adaligaji@hotmail.com')).toBeTruthy();
    expect(getByText('Hola')).toBeTruthy();
    expect(queryByTestId('postimg')).toHaveAttribute('src', 'https://www.luisan.net/blog/wp-content/uploads/2014/09/color_small_mk-e1549454603143.png');
    expect(queryByTestId('perfil')).toHaveAttribute('src', 'https://i.pinimg.com/originals/19/87/90/198790eb7e08830027c1ae1686496c72.png');

})

it('Activa comentarios', ()=>{
    const {queryByTestId} = render(<PostData/>);

    expect(queryByTestId('haycomentarios')).toHaveAttribute('class', 'nocomentarios');

    fireEvent.click(queryByTestId('comment'));

    expect(queryByTestId('haycomentarios')).toHaveAttribute('class', 'sicomentarios');

})

it('Activa escribir comentarios', ()=>{
    const {queryByTestId} = render(<PostData/>);

    fireEvent.click(queryByTestId('comment'));

    expect(queryByTestId('escribircomentarios')).toHaveAttribute('class', 'publicar');

    fireEvent.click(queryByTestId('pensamiento'));

    expect(queryByTestId('escribircomentarios')).toHaveAttribute('class', 'escribir');

})

it('Cancela comentarios', ()=>{
    const {queryByTestId} = render(<PostData/>);

    fireEvent.click(queryByTestId('comment'));
    fireEvent.click(queryByTestId('pensamiento'));

    expect(queryByTestId('escribircomentarios')).toHaveAttribute('class', 'escribir');

    fireEvent.click(queryByTestId('cancelar'));

    expect(queryByTestId('escribircomentarios')).toHaveAttribute('class', 'publicar');


})

