import React from 'react';
import {render, fireEvent, queryByText, getByTestId} from '@testing-library/react';
import Registro from '../pages/Registro/registro.js';


it("Render correcto", ()=>{
    const {queryByTestId, queryByPlaceholderText} = render(<Registro/>)

    expect(queryByTestId('signupform')).toBeTruthy();
    expect(queryByTestId('registrarse')).toBeTruthy();
    expect(queryByTestId('email')).toBeTruthy();
    expect(queryByTestId('correo')).toBeTruthy();
    expect(queryByTestId('error')).toBeTruthy();
    expect(queryByTestId('contra')).toBeTruthy();
    expect(queryByTestId('password')).toBeTruthy();
    expect(queryByTestId('errorMsg')).toBeTruthy();
    expect(queryByTestId('boton')).toBeTruthy();
    expect(queryByTestId('registro')).toBeTruthy();
    expect(queryByTestId('login')).toBeTruthy();

})

describe('valor correo', () =>{
    it('cambia al escribir', ()=>{
        const {queryByTestId}=render(<Registro/>)

        const input = queryByTestId('correo');

        fireEvent.change(input,{target :{value: 'prueba'}});

        expect(input.value).toBe('prueba');
    })
})

describe('valor contraseña', () =>{
    it('cambia al escribir', ()=>{
        const {queryByTestId}=render(<Registro/>)

        const input = queryByTestId('password');

        fireEvent.change(input,{target :{value: 'contraseña123'}});

        expect(input.value).toBe('contraseña123');
    })
})