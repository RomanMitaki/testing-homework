import {ROUTES, fakeFullProducts} from './helpers';
import assert = require('assert');

describe('Cart', async function () {
    it('should increase the quantity of goods when you press the button', async function ({browser}) {
        const mock = await browser.mock('http://localhost:3000/hw/store/api/products/1', {
            method: 'get'
        })

        mock.respond(fakeFullProducts[0], {
            statusCode: 200,
            fetchResponse: true
        })

        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto(`${ROUTES.catalog}/1`);
        const addBtn = await browser.$('.ProductDetails-AddToCart');
        assert.ok((await addBtn.getText()) === 'Add to Cart', 'Кнопка добавления товара не найдена');
        await addBtn.click();
        await addBtn.click();
        await page.goto(ROUTES.cart);
        const productAmount = await browser.$('.Cart-Count').getText();
        assert.ok(productAmount === '2', 'Количество товара неверное');
    });

    it('should preserve cart content between page reloads', async function ({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        await page.goto(ROUTES.cart);
        await page.evaluate(() => {
            localStorage.setItem('example-store-cart', JSON.stringify({
                '1': {
                    name: 'Phone',
                    price: 2000,
                    count: 1
                }
            }));
        });

        await page.reload();

        const totalPriceBeforeReload = await browser.$('.Cart-OrderPrice').getText();
        await page.reload();
        const totalPriceAfterReload = await browser.$('.Cart-OrderPrice').getText();
        expect(totalPriceBeforeReload).toEqual(totalPriceAfterReload);

        await page.evaluate(() => {
            localStorage.removeItem('example-store-cart');
        });
    });


    it('should display a message indicating that the order has been successfully sent, after filling out the form with valid data', async function ({browser}) {

        const mock = await browser.mock('http://localhost:3000/hw/store/api/products/1', {
            method: 'get'
        })

        mock.respond(fakeFullProducts[0], {
            statusCode: 200,
            fetchResponse: true
        })

        const mockCart = await browser.mock('http://localhost:3000/hw/store/api/checkout', {
            method: 'post'
        })

        mockCart.respond({id: 1}, {
            statusCode: 200,
            fetchResponse: false
        })

        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto(`${ROUTES.catalog}/1`);

        const addBtn1 = await browser.$('.ProductDetails-AddToCart');
        await addBtn1.click();

        await page.goto(ROUTES.cart);
        await browser.$('.Cart-Table').waitForExist();
        assert.ok((await browser.$('.Cart-Name').getText()) === fakeFullProducts[0].name)
        await browser.$('#f-name').setValue('Иван Иванович');
        await browser.$('#f-phone').setValue('8911111111');
        await browser.$('#f-address').setValue('Moscow');
        await browser.$('.Form-Submit').click();

        await expect(await browser.$('.Cart-SuccessMessage')).toExist();

    });
})