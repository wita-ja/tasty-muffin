import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
    public readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Shipping part

    public get shippingAddressSelect(): Locator {
        return this.page.getByTestId('checkout-shippingoptions-parcelselect');
    }

    public get shippingDetailsContinueButton(): Locator {
        return this.page.getByTestId('checkout-shippingdetails-continue');
    }

    public get shippingCountrySelect(): Locator {
        return this.page.getByTestId('checkout-shippingdestination-select');
    }

    public getCountryOptionByText(optionText: string) {
        return this.page.getByRole('option', { name: optionText })
    }

    public getShippingOptionRadioButton(shippingOption: 'omniva'|'lpexpress'|'dpdpickup') {
        console.log(`checkout-shippingdetails-option-${shippingOption}`);
        return this.page.getByTestId(`checkout-shippingdetails-option-${shippingOption}`)
    }

    public getParcelAddressOptionByText(optionText: string) {
        return this.page.getByRole('option', { name: optionText })
    }

    //Contact info part

    public get emailInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Email' });
    }

    public get fullnameInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Your full name' });
    }

    public get countryCodeSelect(): Locator {
        return this.page.getByRole('button', { name: 'Country Code Selector' });
    }

    public get countryCodeSearchInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Search by country name or' });
    }

    public get phoneNumberInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Your phone number' });
    }

    public get commentTextArea(): Locator {
        return this. page.getByRole('textbox', { name: 'Your comment' });
    }

    public get contactInfoContinueButton(): Locator {
        return this.page.getByTestId('checkout-contactinformation-continue');
    }

    public get placeOrderButton(): Locator {
        return this.page.getByTestId('checkout-paymentmethods-placeorder');
    }
}