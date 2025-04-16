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

    public async setProductQuantity(random: boolean = true, quantity: number = 0): Promise<void> {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        const finalQuantity = random ? randomNumber.toString() : quantity.toString();

        await this.productQuantityField.fill(finalQuantity);
    }
}

