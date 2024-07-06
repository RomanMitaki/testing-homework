import React from 'react';
import { MemoryRouter } from "react-router-dom";
import {Application} from '../../src/client/Application';
import { ROUTES, renderWithProviders } from './helpers';

export const PAGES_CONTENT = {
    [ROUTES.home]: ' Kogtetochka storeCatalogDeliveryContactsCartWelcome to Kogtetochka store!We have a large assortment of scratching posts!StabilityOur scratching posts are crafted with precision and designed for unparalleled stability. Made from high-quality materials, they provide a sturdy platform for your cat\'s scratching needs.ComfortPamper your feline friend with the luxurious comfort of our scratching posts. Covered in soft, plush fabric, they offer a cozy retreat for your cat to relax and unwind.DesignEngage your cat\'s natural instincts and keep them entertained for hours with our interactive scratching posts. Featuring built-in toys and enticing textures, they stimulate your cat\'s senses and encourage active play.Empower Your Coding Journey with Every Scratch – Get Your Paws on Our Purr-fect Scratchers Today! ',
    [ROUTES.delivery]: ' Kogtetochka storeCatalogDeliveryContactsCartDeliverySwift and Secure Delivery: Experience the convenience of hassle-free shipping with our scratchers. We understand the excitement of receiving your new cat furniture, so we prioritize swift delivery to your doorstep. Rest assured, your order is handled with care every step of the way, ensuring it arrives safely and securely.Track Your Package with Ease: Stay informed and in control of your delivery with our easy-to-use tracking system. From the moment your order is placed to the minute it reaches your home, you can monitor its journey in real-time. No more guessing games – know exactly when to expect your package and plan accordingly.Customer Satisfaction Guaranteed: Your satisfaction is our top priority, which is why we go above and beyond to provide exceptional delivery service. If you have any questions or concerns about your shipment, our dedicated customer support team is here to assist you every step of the way. Trust us to deliver not only your scratcher but also peace of mind. ',
    [ROUTES.contacts]: ' Kogtetochka storeCatalogDeliveryContactsCartContactsHave a question about our scratchers or need help placing an order? Don\'t hesitate to reach out to us! Our dedicated team is here to provide you with top-notch service and support.Our friendly representatives are available during business hours to assist you with any inquiries you may have.At our store, customer satisfaction is our priority, and we\'re committed to ensuring you have a smooth and enjoyable shopping experience. Reach out to us today – we\'re here to help make your cat\'s scratching dreams a reality! '
}

describe('Pages', () => {

    it('should display correct content of HomePage', () => {
        const {container } = renderWithProviders(
            <MemoryRouter initialEntries={[ROUTES.home]}>
                <Application />
            </MemoryRouter>);
        expect(container.textContent).toContain(PAGES_CONTENT[ROUTES.home])
    });
    it('should display correct content of DeliveryPage', () => {
        const {container } = renderWithProviders(
            <MemoryRouter initialEntries={[ROUTES.delivery]}>
                <Application />
            </MemoryRouter>);

        expect(container.textContent).toContain(PAGES_CONTENT[ROUTES.delivery])
    });
    it('should display correct content of ContactsPage', () => {
        const {container } = renderWithProviders(
            <MemoryRouter initialEntries={[ROUTES.contacts]}>
                <Application />
            </MemoryRouter>);
        expect(container.textContent).toContain(PAGES_CONTENT[ROUTES.contacts])
    });
})