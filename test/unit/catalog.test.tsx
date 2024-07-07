import React from 'react';
import {MemoryRouter} from 'react-router';
import {screen} from '@testing-library/react';
import {Catalog} from '../../src/client/pages/Catalog';
import {CartApi, ExampleApi} from '../../src/client/api';
import {ROUTES, renderWithProviders} from './helpers';
import {fakeShortProducts} from '../mocks';

afterEach(() => {
    jest.clearAllMocks();
});

describe('CatalogPage', () => {
    it('should display products, the list of which comes from the server', async () => {
        jest
            .spyOn(ExampleApi.prototype, 'getProducts')
            // @ts-ignore
            .mockImplementation(() => {
                return Promise.resolve({
                    data: fakeShortProducts,
                    status: 200,
                    statusText: 'Ok',
                    headers: {},
                    config: {},
                })
            })
        renderWithProviders(
            <MemoryRouter initialEntries={[ROUTES.catalog]}>
                <Catalog/>
            </MemoryRouter>)

        // @ts-ignore
        expect(await (screen.findByText(fakeShortProducts[0].name))).toBeInTheDocument();
        // @ts-ignore
        expect(await (screen.findByText(fakeShortProducts[1].name))).toBeInTheDocument();
        // @ts-ignore
        expect(await (screen.findByText(fakeShortProducts[2].name))).toBeInTheDocument();
        expect((await (screen.findByTestId('product-list'))).children).toHaveLength(fakeShortProducts.length);
        expect((await (screen.findByTestId('product-list'))).children).not.toHaveLength(0);
    });

    it('should display detailed information about the product (the name, price and link to a page with detailed information about the product)', async () => {
        jest
            .spyOn(ExampleApi.prototype, 'getProducts')
            // @ts-ignore
            .mockImplementation(() => {
                return Promise.resolve({
                    data: fakeShortProducts,
                    status: 200,
                    statusText: 'Ok',
                    headers: {},
                    config: {},
                })
            })
        renderWithProviders(
            <MemoryRouter initialEntries={[ROUTES.catalog]}>
                <Catalog/>
            </MemoryRouter>)

        const productList = (await (screen.findByTestId('product-list'))).children
        
        for (let i = 0; i < productList.length; i++) {
            const productOne = await (screen.findAllByTestId(fakeShortProducts[i].id));
            const productInfo = productOne[1];

            expect(productOne).toBeTruthy();
            // @ts-ignore
            expect(productInfo.querySelector('h5')).toHaveTextContent(fakeShortProducts[i].name);
            // @ts-ignore
            expect(productInfo.querySelector('a')).toHaveAttribute('href', `${ROUTES.catalog}/${fakeShortProducts[i].id}`);
            expect(productInfo.querySelector('.ProductItem-Price')?.textContent).toMatch(`${fakeShortProducts[i].price}`)
        }
    });

    it('should display message about product if an item has already been added to the cart', async () => {
        jest
            .spyOn(ExampleApi.prototype, 'getProducts')
            // @ts-ignore
            .mockImplementation(() => {
                return Promise.resolve({
                    data: fakeShortProducts,
                    status: 200,
                    statusText: 'Ok',
                    headers: {},
                    config: {},
                })
            })
        jest
            .spyOn(CartApi.prototype, 'getState')
            .mockImplementation(() => {
                return {
                    [fakeShortProducts[0].id]: {
                        name: fakeShortProducts[0].name,
                        price: fakeShortProducts[0].price,
                        count: 1
                    }
                }
            })

        renderWithProviders(
            <MemoryRouter initialEntries={[ROUTES.catalog]}>
                <Catalog/>
            </MemoryRouter>)

        const productOne = await (screen.findAllByTestId(fakeShortProducts[0].id));
        const productInfo = productOne[1];
        // @ts-ignore
        expect((await screen.findByText('Item in cart'))).toBeVisible();
        // @ts-ignore
        expect(productInfo.querySelector('.CartBadge')).toHaveTextContent('Item in cart')
    })
});