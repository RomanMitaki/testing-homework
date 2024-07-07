const {ROUTES} = require('./helpers');

describe('BurgerMenu icon', async function () {
    it('should be displayed when the screen width is less than 576 pixels', async function ({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await browser.setWindowSize(575, 800);
        await page.goto(ROUTES.home);
        await expect(await browser.$('.navbar-toggler')).toBeDisplayed();
    });

    it('should be open when have been clicked', async function ({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await browser.setWindowSize(575, 800);
        await page.goto(ROUTES.home);
        const burgerBtn = await browser.$('.navbar-toggler');
        await burgerBtn.click();
        const navBar = await browser.$('.navbar-nav');
        await expect(navBar).toBeDisplayed();
    });

    it('should be closed when any link have been clicked', async function ({browser}) {
        const puppeteer = await browser.getPuppeteer();
        const [page] = await puppeteer.pages();
        await browser.setWindowSize(575, 800);
        await page.goto(ROUTES.home);
        const burgerBtn = await browser.$('.navbar-toggler');
        await burgerBtn.click();
        const menuItem = await browser.$('.navbar .nav-link[href="/hw/store/delivery"]');
        await menuItem.click();
        const navBar = await browser.$('.navbar-nav');
        await expect(navBar).not.toBeDisplayed();
    });
});