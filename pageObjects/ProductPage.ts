import { Locator, Page } from "@playwright/test";

export class ProductPage {
    public readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get productQuantityField(): Locator {
        return this.page.getByTestId('productpage-text-qty');
    }

    public get addProductButton(): Locator {
        return this.page.getByTestId('productsection-btn-addtobag');
    }

    public get shoppingCartCheckoutButton(): Locator {
        return this.page.getByTestId('shoppingcart-btn-checkout');
    }

    public async setProductQuantity(quantity: number): Promise<void> {
        await this.productQuantityField.fill(quantity.toString());
    }
}

