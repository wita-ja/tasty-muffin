import { expect } from "@playwright/test";
import { test } from "../fixtures/customFixtures"
import { ShippingOption } from "../pageObjects/checkoutPage/ShippingOption.enum";
import { HomePageErrorMessages } from "../pageObjects/homePage/HomePageErrorMessages.enum";
import { CheckoutPageErrorMessages } from "../pageObjects/checkoutPage/CheckoutPageErrorMessages.enum";

test.describe('Product ordering flow', () => {
  test.beforeEach(async ({ homePage, shopPage, productPage }) => {
     await homePage.navigateToShopPage();
     await shopPage.selectProductByIndex();
  
     await productPage.setProductQuantity();
     await productPage.addProductButton.click();
  
     await productPage.shoppingCartCheckoutButton.click();
  });

  test('should order successfully product from the shop', async ({ homePage, checkoutPage }) => {
    await checkoutPage.selectShippingAddress("Lithuania", ShippingOption.LpExpress, 'CUP, Upės g. 9, Vilnius');
    await checkoutPage.shippingDetailsContinueButton.click();

    await checkoutPage.emailInput.fill('Vita-Test@any.com');
    await checkoutPage.fullnameInput.fill('Vita Test');
    await checkoutPage.enterPhoneNumber('370', '60000000');
    await checkoutPage.enterDietComment();
    await checkoutPage.contactInfoContinueButton.click();
    await checkoutPage.placeOrderButton.click();

    await expect(homePage.successOrderModal).toBeVisible();
    await expect(homePage.successOrderModalTitle).toHaveText(HomePageErrorMessages.SUCCESS_ORDER_MODAL_TITLE);
    await expect(homePage.successOrderModalText).toHaveText(HomePageErrorMessages.SUCCESS_ORDER_MODAL_TEXT);

    await homePage.successOrderModalGotItButton.click();
    await expect(homePage.shoppingCartButton).toContainText('(0)');
  })

  test('should trigger shipping information field validations', async ({ checkoutPage }) => {
    await checkoutPage.shippingCountrySelect.click();
    await checkoutPage.getCountryOptionByText('Lithuania').click();
    await checkoutPage.shippingDetailsContinueButton.click();

    await expect(checkoutPage.parcelAdressValidationText).toBeVisible();
    await expect(checkoutPage.parcelAdressValidationText).toHaveText('Please choose a parcel address to continue');
  })

  test('should trigger contact information field validations', async ({ checkoutPage }) => {
    await checkoutPage.selectShippingAddress("Lithuania", ShippingOption.DpdPickup, 'CUP DPD paštomatas 019, UPĖS G. 9, VILNIUS');
    await checkoutPage.shippingDetailsContinueButton.click();
    await checkoutPage.contactInfoContinueButton.click();
  
    await expect.soft(checkoutPage.emailValidationText).toHaveText(CheckoutPageErrorMessages.EMAIL_VALIDATION_TEXT);
    await expect.soft(checkoutPage.fullnameValidationText).toHaveText(CheckoutPageErrorMessages.FULLNAME_VALIDATION_TEXT);
    await expect.soft(checkoutPage.phoneNumberValidationText).toHaveText(CheckoutPageErrorMessages.PHONE_NUMBER_VALIDATION_TEXT);
    await expect.soft(checkoutPage.commentValidationText).toHaveText(CheckoutPageErrorMessages.COMMENT_VALIDATION_TEXT);
  })
})
