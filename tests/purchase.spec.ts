import { expect } from "@playwright/test";
import {test} from "../fixtures/customFixtures"
import { HomePage } from "../pageObjects/HomePage";
import { ShopPage } from "../pageObjects/ShopPage";
import { ProductPage } from "../pageObjects/ProductPage";
import { CheckoutPage } from "../pageObjects/CheckoutPage";

test.describe('Product buying flow', () => {
  test('Buy any product from the shop', async ({homePage, shopPage, productPage, checkoutPage}) => {
    //Main page
    await homePage.openShopPage();
    await shopPage.product.nth(2).click();
    //product page
    await productPage.productQuantityField.fill('3');
    await productPage.addProductButton.click();
    //checkout side panel
    await productPage.shoppingCartCheckoutButton.click();

    //shipping page
    await checkoutPage.shippingCountrySelect.click();
    await checkoutPage.getCountryOptionByText("Lithuania").click();
    await checkoutPage.getShippingOptionRadioButton('lpexpress').click();
    await checkoutPage.shippingAddressSelect.click();
    await checkoutPage.getParcelAddressOptionByText('CUP, Upės g. 9, Vilnius').click();
    await checkoutPage.shippingDetailsContinueButton.click();

    //contact info and confirmation
    await checkoutPage.emailInput.fill('any@any.com');
    await checkoutPage.fullnameInput.fill('Any Nani');
    await checkoutPage.countryCodeSelect.click();
    await checkoutPage.countryCodeSearchInput.click();
    await checkoutPage.countryCodeSearchInput.fill('Lithuania');
    await checkoutPage.phoneNumberInput.click();
    await checkoutPage.phoneNumberInput.fill("60000000");
    await checkoutPage.commentTextArea.click();
    await checkoutPage.commentTextArea.fill('No restrictions');
    await checkoutPage.contactInfoContinueButton.click();
    
    await checkoutPage.placeOrderButton.click();
   
    await expect(homePage.successOrderModal).toBeVisible();
    await expect(homePage.successOrderModalTitle).toHaveText('Thank you for your order');
    await expect(homePage.successOrderModalText).toHaveText('Your order has been received.');
  
    await homePage.successOrderModalGotItButton.click();
    await expect(homePage.shoppingCartButton).toContainText('(0)');
  })
})
