import test, { expect } from "@playwright/test";

/* test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.open('https://www.saucedemo.com/');
  });

  for (const credential of loginCredentials) {
    test(`Login with ${credential.isValid ? 'valid' : 'invalid'} credentials`, async () => {
      await loginPage.enterCredentials(credential.username, credential.password);
      await loginPage.submit();

      const expectedValue = credential.isValid ? true : false;

      await loginPage.page.pause();
      expect(await loginPage.pageHeader.isHidden(), 'Login page logo still visible').toBe(expectedValue);
    });
  }
}); */

test.describe('Product buying flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
  });

  test('Buy any product from the shop', async ({page}) => {
    //Main page
    //await page.getByTestId('navigation-item-shop').first().click();
    await page.getByRole('link', { name: 'Shop' }).click();
    //shop list page
    await page.getByTestId('product-list-section-item-title').nth(2).click();
    //product page
    await page.getByTestId('productpage-text-qty').fill('3');
    await page.getByTestId('productsection-btn-addtobag').click();
    //checkout side panel
    await page.getByTestId('shoppingcart-btn-checkout').click();

    //shipping page
    await page.getByTestId('checkout-shippingdetails-option-lpexpress').click();
    await page.getByTestId('checkout-shippingoptions-parcelselect').click();
    await page.getByRole('option', { name: 'CUP, Upės g. 9, Vilnius' }).click();
    await page.getByTestId('checkout-shippingdetails-continue').click();

    //contact info and confirmation
    await page.getByRole('textbox', { name: 'Email' }).fill('any@any.com');
    await page.getByRole('textbox', { name: 'Your full name' }).fill('Any Nani');
    await page.getByRole('button', { name: 'Country Code Selector' }).click();
    await page.getByRole('textbox', { name: 'Search by country name or' }).click();
    await page.getByRole('textbox', { name: 'Search by country name or' }).fill('Lithuania');
    await page.getByRole('textbox', { name: 'Your phone number' }).click();
    await page.getByRole('textbox', { name: 'Your phone number' }).fill("60000000");
    await page.getByRole('textbox', { name: 'Your comment' }).click();
    await page.getByRole('textbox', { name: 'Your comment' }).fill('No restrictions');

    await page.getByTestId('checkout-contactinformation-continue').click();
    await page.getByTestId('checkout-paymentmethods-placeorder').click();
   

    await expect(page.getByTestId('ecommerce-modal-checkout-success-order')).toBeVisible();
    await expect(page.getByTestId('ecommerce-modal-checkout-success-order').locator('css= .payment-info__title')).toHaveText('Thank you for your order');
    await expect(page.getByTestId('ecommerce-modal-checkout-success-order').locator('css= .payment-info__text')).toHaveText('Your order has been received.');
  
    await page.getByTestId('ecommerce-modal-checkout-success-order').getByRole('button').click();

    await expect(page.locator('.block-header-layout-desktop').getByTestId('header-btn-shoppingbag').first()).toContainText('(0)');
  })
})
