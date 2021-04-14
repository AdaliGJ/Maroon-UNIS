import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import Post from './../contenedores/Post/post.js';
import suma from './../suma.js';

test('suma 1 + 2 = 3', ()=>{
    expect(suma(1,2)).toBe(3);
});

it("renders correctly", () => {
    const {queryByTestId, queryByPlaceholderText} = render(<Post/>)

    expect(queryByTestId('comentar')).toBeTruthy()
    expect(queryByPlaceholderText('Escribe algo...')).toBeTruthy()
})