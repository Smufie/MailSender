const puppeteer = require('puppeteer');

let browser;
let page;
jest.setTimeout(15000);

beforeAll(async () => {
	browser = await puppeteer.launch();
	page = await browser.newPage();
	global.page = page;
	await page.goto('http://localhost:8080/adduser');
});

afterAll(async () => {
	await browser.close();
});

describe('add person view tests', () => {
	test('should add person to table and display it after refresh', async () => {
		// given
		const randomId = Math.floor(Math.random() * 1000);

		await page.click('#name-input');
		await page.type('#name-input', `Johnny${randomId}`);

		await page.click('#mail-input');
		await page.type('#mail-input', `johnny${randomId}@test.com`);

		await page.$eval('#interest-checkbox-space .interest-checkbox-label', (label) =>
			label.click()
		);

		const tableSizeBefore = await page.$$eval(
			'#person-table tr',
			(selectedTable) => selectedTable.length
		);
		// when
		await page.click('#submit-button');
		await page.waitForTimeout(2000);
		await page.click('#persons-button');
		await page.waitForTimeout(1000);
		// then

		const informationReturned = await page.$eval(
			'.information-returned',
			(information) => information.innerHTML
		);

		expect(informationReturned).toMatch(
			`Person "Johnny${randomId}" successfully created with id`
		);

		const tableSizeAfter = await page.$$eval(
			'#person-table tr',
			(selectedTable) => selectedTable.length
		);
		expect(tableSizeBefore < tableSizeAfter).toBe(true);
	});
});
