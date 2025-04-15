import { test as base } from '@playwright/test';
import { HomePage } from '../pageObjects/HomePage';
import { ProductPage } from '../pageObjects/ProductPage';
import { ShopPage } from '../pageObjects/ShopPage';
import { CheckoutPage } from '../pageObjects/CheckoutPage';


type MyFixtures = {
  homePage: HomePage;
  shopPage: ShopPage;
  productPage: ProductPage
  checkoutPage: CheckoutPage
};

export const test = base.extend<MyFixtures>({
  page: async ({ baseURL, page }, use) => {
    await page.goto(baseURL!);
    await use(page);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page)
    await use(homePage);
  },

  shopPage: async ({ page }, use) => {
    const shopPage = new ShopPage(page)
    await use(shopPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page)
    await use(productPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page)
    await use(checkoutPage);
  },
});