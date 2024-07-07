import React from 'react';
import {afterEach, describe, expect, it, jest} from '@jest/globals'
import {screen } from '@testing-library/react';
import { renderWithProviders } from './helpers';
import { fakeFullProducts } from '../mocks';
import { ProductDetails } from '../../src/client/components/ProductDetails';
import userEvent from '@testing-library/user-event';

afterEach(() => {
    jest.clearAllMocks();
});

describe('ProductPage', () => {
    it('should contain the name of the product, its description, price, color, material and the “add to cart” button', () => {
        const id = 1;
        renderWithProviders(<ProductDetails product={fakeFullProducts[id]}/>)
        const {name, price, description, color, material } = fakeFullProducts[id];
        expect(screen.getByRole('heading', {level: 1}).textContent).toEqual(name);
        // @ts-ignore
        expect(screen.getByText(description)).toBeInTheDocument();
        // @ts-ignore
        expect(screen.getByText(color)).toBeInTheDocument();
        // @ts-ignore
        expect(screen.getByText(material)).toBeInTheDocument();
        // @ts-ignore
        expect(screen.getByText((content, element) => content.includes(`${price}`))).toBeInTheDocument();
        // @ts-ignore
        expect(screen.getByRole('button')).toHaveTextContent('Add to Cart');
        // @ts-ignore
        expect(screen.getByRole('button')).toHaveClass('btn-lg');
    });

    it('should contain a message about if an item has already been added to the cart    ', async () => {
        const id = 1;
        renderWithProviders(<ProductDetails product={fakeFullProducts[id]}/>)
        const buttonCart = screen.getByRole('button', { name: 'Add to Cart'});
        await userEvent.click(buttonCart);
        // @ts-ignore
        expect((await screen.findByText('Item in cart'))).toBeVisible();
    });

})