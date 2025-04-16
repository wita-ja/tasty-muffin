import { Locator, Page } from "@playwright/test";

export class ShopPage {
    public readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get product(): Locator {
        return this.page.getByTestId('product-list-section-item-title');
    }

    public async selectProductByIndex(index: number = 1): Promise<void> {
        await this.product.nth(index).click();
    }
}

