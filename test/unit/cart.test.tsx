import React from 'react';
import {screen} from '@testing-library/react';
import {ROUTES, renderWithProviders} from './helpers';
import {fakeCartContent, fakeFullProducts, fakeShortProducts} from '../mocks';
import {Application} from '../../src/client/Application';
import {Cart} from '../../src/client/pages/Cart';
import {BrowserRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import {CartApi} from '../../src/client/api';


afterEach(() => {
    jest.clearAllMocks();
});

describe('Cart', () => {
    it('should display a link to the catalog if the cart is empty', () => {
        renderWithProviders(
            <BrowserRouter>
                <Cart/>
            </BrowserRouter>);
        // @ts-ignore
        expect(screen.getByText(/Cart is empty/)).toBeInTheDocument();
        // @ts-ignore
        expect(screen.getByRole('link', {name: 'catalog'})).toHaveAttribute('href', ROUTES.catalog)
    });

    it('should have a “empty cart” button, clicking on which should remove all items', async () => {
        jest
            .spyOn(CartApi.prototype, 'getState')
            .mockImplementation(() => fakeCartContent);

        renderWithProviders(
            <BrowserRouter>
                <Cart/>
            </BrowserRouter>);

        const clearBtn = screen.getByRole('button', {name: 'Clear shopping cart'});
        // @ts-ignore
        expect(screen.getByRole('table')).toBeInTheDocument();
        const allProductsInCart = [screen.getByTestId(fakeFullProducts[0].id), screen.getByTestId(fakeFullProducts[1].id)];
        // @ts-ignore
        allProductsInCart.forEach((item) => expect(screen.getByRole('table')).toContainElement(item))
        expect(allProductsInCart).toHaveLength(2);
        await userEvent.click(clearBtn);
        const table = screen.queryByRole('table');
        expect(table).toBeNull();
        // @ts-ignore
        expect(await screen.findByText(/Cart is empty/)).toBeInTheDocument();
    });

    it('should display the name, price, quantity and the total amount of the order for each product', async () => {

        jest
            .spyOn(CartApi.prototype, 'getState')
            .mockImplementation(() => fakeCartContent);

        renderWithProviders(
            <BrowserRouter>
                <Cart/>
            </BrowserRouter>);
        // @ts-ignore
        expect(screen.getByRole('table')).toBeInTheDocument();

        const allProductsInCart = [screen.getByTestId(fakeFullProducts[0].id), screen.getByTestId(fakeFullProducts[1].id)];

        for (let i = 0; i < allProductsInCart.length; i++) {
            const {id, name, price} = fakeFullProducts[i];
            const productInCart = screen.getByTestId(id);
            // @ts-ignore
            expect(productInCart.querySelector('.Cart-Name')).toHaveTextContent(name);
            // @ts-ignore
            expect(productInCart.querySelector('.Cart-Price')).toHaveTextContent(`${price}`);
            // @ts-ignore
            expect(productInCart.querySelector('.Cart-Count')).toHaveTextContent('1');
            // @ts-ignore
            expect(productInCart.querySelector('.Cart-Total')).toHaveTextContent(`${price}`);
        }
        // @ts-ignore
        expect(screen.getByTestId('total')).toHaveTextContent(`${fakeFullProducts[0].price + fakeFullProducts[1].price}`)

    });

    it('should display the number of non-repeating items in the header next to the link to the cart', async () => {
        jest
            .spyOn(CartApi.prototype, 'getState')
            .mockImplementation(() => {
                return {
                    [fakeShortProducts[0].id]: {
                        name: fakeShortProducts[0].name,
                        price: fakeShortProducts[0].price,
                        count: 2
                    },
                    [fakeShortProducts[1].id]: {
                        name: fakeShortProducts[1].name,
                        price: fakeShortProducts[1].price,
                        count: 5
                    },
                }
            })

        renderWithProviders(
            <BrowserRouter>
                <Application/>
            </BrowserRouter>);
        // @ts-ignore
        expect(screen.getByRole('link', {name: /Cart/})).toHaveTextContent('Cart (2)');
    });
});