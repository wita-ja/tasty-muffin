import { Locator, Page } from "@playwright/test";

export class HomePage {
    public readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public get shopButton(): Locator {
        return this.page.getByRole('link', { name: 'Shop' });
    }

    public get shoppingCartButton(): Locator {
        return this.page.locator('.block-header-layout-desktop').getByTestId('header-btn-shoppingbag');
    }

    public async navigateToShopPage() {
        return await this.shopButton.click();
    }

    public get successOrderModal(): Locator {
        return this.page.getByTestId('ecommerce-modal-checkout-success-order');
    }

    public get successOrderModalTitle(): Locator {
        return this.successOrderModal.locator('css= .payment-info__title');
    }

    public get successOrderModalText(): Locator {
        return this.successOrderModal.locator('css= .payment-info__text');
    }

    public get successOrderModalGotItButton(): Locator {
        return this.successOrderModal.getByRole('button');
    }

    //other elements on home page
}

