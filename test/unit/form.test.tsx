import React from "react";
import { renderWithProviders } from "./helpers";
import { Form } from '../../src/client/components/Form';
import {screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckoutFormData } from "../../src/common/types";

describe('Form', () => {
    it('should send data if correct data have been entered', async () => {
        const user = userEvent.setup()
        const userData = {
            name: 'Roman Mitaki',
            phone: '8915111111',
            address: 'Pushkino',
        }
        const onSubmit = jest.fn((data: CheckoutFormData)=> data)
        renderWithProviders(<Form onSubmit={onSubmit} />)
        const nameInput = screen.getByTestId('f-name')
        const phoneInput = screen.getByTestId('f-phone')
        const addressInput = screen.getByTestId('f-address')
        const submitBtn = screen.getByRole('button', {name: 'Checkout'})

        await user.type(nameInput, userData.name);
        await user.type(addressInput, userData.address);
        await user.type(phoneInput, userData.phone);

        // @ts-ignore
        expect(nameInput).toHaveValue(userData.name)
        // @ts-ignore
        expect(phoneInput).toHaveValue(userData.phone)
        // @ts-ignore
        expect(addressInput).toHaveValue(userData.address)
        await user.click(submitBtn);

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith( {
            name: userData.name,
            phone: userData.phone,
            address: userData.address,
        });
    });

    it('should display an error when an incorrect phone number have been entered', async () => {
        const user = userEvent.setup()
        const userData = {
            name: 'Roman Mitaki',
            phone: '1111111',
            address: 'Pushkino',
        }
        const onSubmit = jest.fn((data: CheckoutFormData)=> data)
        renderWithProviders(<Form onSubmit={onSubmit} />)
        const phoneInput = screen.getByTestId('f-phone')
        const submitBtn = screen.getByRole('button', {name: 'Checkout'})

        await user.type(phoneInput, userData.phone);
        // @ts-ignore
        expect(phoneInput).toHaveValue(userData.phone)
        await user.click(submitBtn);

        expect(onSubmit).not.toBeCalled()
        // @ts-ignore
        expect(screen.getByText('Please provide a valid phone')).toBeVisible();
    });

    it('should display an error if a name have not been entered', async () => {
        const user = userEvent.setup();

        const onSubmit = jest.fn((data: CheckoutFormData)=> data)
        renderWithProviders(<Form onSubmit={onSubmit} />);
        const nameInput = screen.getByTestId('f-name');
        // @ts-ignore
        expect(nameInput).toHaveValue('');
        const submitBtn = screen.getByRole('button', {name: 'Checkout'});
        await user.click(submitBtn);
        expect(onSubmit).not.toBeCalled()
        // @ts-ignore
        expect(screen.getByText('Please provide your name')).toBeVisible();
    });

    it('should display an error if an address have not been entered', async () => {
        const user = userEvent.setup();

        const onSubmit = jest.fn((data: CheckoutFormData)=> data)
        renderWithProviders(<Form onSubmit={onSubmit} />);
        const addressInput = screen.getByTestId('f-address')
        // @ts-ignore
        expect(addressInput).toHaveValue('');
        const submitBtn = screen.getByRole('button', {name: 'Checkout'});
        await user.click(submitBtn);
        expect(onSubmit).not.toBeCalled()
        // @ts-ignore
        expect(screen.getByText('Please provide a valid address')).toBeVisible();
    });
})