import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {describe, it, jest} from '@jest/globals'
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Application} from '../../src/client/Application';
import {ROUTES, checkNavLinkByHref, findLinkByName, renderWithProviders} from './helpers';
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.get.mockResolvedValue({
    data: [],
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('Navigation', () => {

    it('should display four links', () => {
        renderWithProviders(
            <BrowserRouter>
                <Application/>
            </BrowserRouter>);
        const nav = screen.getByRole('navigation');
        const navLinks = Array.from(nav.querySelectorAll('.nav-link'));
        expect(navLinks).toHaveLength(4);
        expect(navLinks.every(el => el.tagName === 'A')).toBeTruthy();
        expect(checkNavLinkByHref(navLinks, ROUTES.delivery)).toBeTruthy();
        expect(checkNavLinkByHref(navLinks, ROUTES.contacts)).toBeTruthy();
        expect(checkNavLinkByHref(navLinks, ROUTES.catalog)).toBeTruthy();
        expect(checkNavLinkByHref(navLinks, ROUTES.cart)).toBeTruthy();
    });

    it('The store name should be a link to the main page', () => {
        renderWithProviders(
            <BrowserRouter>
                <Application/>
            </BrowserRouter>);
        const nav = screen.getByRole('navigation');
        const title = nav.querySelector('.navbar-brand');
        // @ts-ignore
        expect(title).toHaveTextContent('Kogtetochka store');
        expect(title?.tagName).toEqual('A');
        // @ts-ignore
        expect(title).toHaveAttribute('href', ROUTES.home);
    });

    it('click on the "Catalog" navigation link should you go to the catalog page', async () => {
        renderWithProviders(
            <BrowserRouter>
                <Application/>
            </BrowserRouter>);
        await userEvent.click(findLinkByName('Catalog'));
        expect(
            (await screen.findByRole('heading', {
                level: 1,
                // @ts-ignore
            }))).toHaveTextContent('Catalog');
    });
    it('click on the "Delivery" navigation link should you go to the delivery page', async () => {
        renderWithProviders(
            <BrowserRouter>
                <Application/>
            </BrowserRouter>);
        await userEvent.click(findLinkByName('Delivery'));
        expect(
            (await screen.findByRole('heading', {
                level: 1,
                // @ts-ignore
            }))).toHaveTextContent('Delivery');
    });
    it('click on the "Cart" navigation link should you go to the cart page', async () => {
        renderWithProviders(
            <BrowserRouter>
                <Application/>
            </BrowserRouter>);
        ;
        await userEvent.click(findLinkByName(/Cart/));
        expect(
            (await screen.findByRole('heading', {
                level: 1,
                // @ts-ignore
            }))).toHaveTextContent('Shopping cart');
    });
    it('click on the "Contacts" navigation link should you go to the contacts page', async () => {
        renderWithProviders(
            <BrowserRouter>
                <Application/>
            </BrowserRouter>);
        await userEvent.click(findLinkByName('Contacts'));
        expect(
            (await screen.findByRole('heading', {
                level: 1,
                // @ts-ignore
            }))).toHaveTextContent('Contacts');
    });
    it('click on the store name in the header should the main page opens', async () => {
        renderWithProviders(
            <BrowserRouter>
                <Application/>
            </BrowserRouter>);
        const nav = screen.getByRole('navigation');
        const title = nav.querySelector('.navbar-brand') as HTMLElement;
        await userEvent.click(title);
        expect(
            (await screen.findByText('Welcome to Kogtetochka store!'))
        ).toBeTruthy();
    });
})
