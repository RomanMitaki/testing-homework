import {ROUTES, fakeFullProducts} from './helpers';


describe('ProductDetails Page', async function () {
    it('should display full information about product', async function ({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await page.goto(`${ROUTES.catalog}/5`);

        await expect(await browser.$('.ProductDetails-Name')).toExist();
        await expect(await browser.$('.ProductDetails-Description')).toExist();
        await expect(await browser.$('.ProductDetails-Price')).toExist();
        await expect(await browser.$('.ProductDetails-Color')).toExist();
        await expect(await browser.$('.ProductDetails-Material')).toExist();
    });

    it('should display a button with class - ".btn-lg"', async function ({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();

        const mock = await browser.mock('http://localhost:3000/hw/store/api/products/1', {
            method: 'get'
        })

        mock.respond(fakeFullProducts[0], {
            statusCode: 200,
            fetchResponse: true
        });

        await page.goto(`${ROUTES.catalog}/1`);
        const btn = await browser.$('.btn-lg');
        await expect(btn).toExist();
    });
})
