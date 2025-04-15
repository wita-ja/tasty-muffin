import { expect } from "@playwright/test";
import { test } from "../fixtures/customFixtures"
import { ShippingOption } from "../pageObjects/checkoutPage/ShippingOption.enum";
import { SUCCESS_ORDER_MODAL_TEXT, SUCCESS_ORDER_MODAL_TITLE } from "../pageObjects/homePage/HomePage.constants";

test.describe('Product buying flow', () => {

  test('Buy any product from the shop', async ({ homePage, shopPage, productPage, checkoutPage }) => {
    //Main page
    await homePage.navigateToShopPage();
    await shopPage.selectProductByIndex();
    //product page
    await productPage.setProductQuantity(3);
    await productPage.addProductButton.click();
    //checkout side panel
    await productPage.shoppingCartCheckoutButton.click();

    //shipping page
    await checkoutPage.selectShippingAddress("Lithuania", ShippingOption.LpExpress, 'CUP, Upės g. 9, Vilnius');
    await checkoutPage.shippingDetailsContinueButton.click();

    //contact info and confirmation
    await checkoutPage.emailInput.fill('any@any.com');
    await checkoutPage.fullnameInput.fill('Any Nani');
    await checkoutPage.enterPhoneNumber('370', '60000000');
    await checkoutPage.enterDietComment();
    await checkoutPage.contactInfoContinueButton.click();
    await checkoutPage.placeOrderButton.click();

    await expect(homePage.successOrderModal).toBeVisible();
    await expect(homePage.successOrderModalTitle).toHaveText(SUCCESS_ORDER_MODAL_TITLE);
    await expect(homePage.successOrderModalText).toHaveText(SUCCESS_ORDER_MODAL_TEXT);

    await homePage.successOrderModalGotItButton.click();
    await expect(homePage.shoppingCartButton).toContainText('(0)');
  })
})
