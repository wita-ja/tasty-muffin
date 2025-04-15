import { Locator, Page } from "@playwright/test";
import { ShippingOption } from "./ShippingOption.enum";

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

    public getCountryOptionByText(optionText: string): Locator {
        return this.page.getByRole('option', { name: optionText })
    }

    public getShippingOptionRadioButton(shippingOption: ShippingOption): Locator {
        return this.page.getByTestId(`checkout-shippingdetails-option-${shippingOption}`)
    }

    public getParcelAddressOptionByText(optionText: string): Locator {
        return this.page.getByRole('option', { name: optionText })
    }

    public async selectShippingAddress(country: string, shippingOption: ShippingOption, address: string): Promise<void> {
        await this.shippingCountrySelect.click();
        await this.getCountryOptionByText(country).click();
        await this.getShippingOptionRadioButton(shippingOption).click();
        await this.shippingAddressSelect.click();
        await this.getParcelAddressOptionByText(address).click();
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
        return this.page.getByRole('textbox', { name: 'Search by country name or country code' });
    }

    public get phoneNumberInput(): Locator {
        return this.page.getByRole('textbox', { name: 'Your phone number' });
    }

    public get commentTextArea(): Locator {
        return this.page.getByRole('textbox', { name: 'Your comment' });
    }

    public get contactInfoContinueButton(): Locator {
        return this.page.getByTestId('checkout-contactinformation-continue');
    }

    public get placeOrderButton(): Locator {
        return this.page.getByTestId('checkout-paymentmethods-placeorder');
    }

    public async enterPhoneNumber(country: string, phoneNumber: string): Promise<void> {
        await this.countryCodeSelect.click();
        await this.countryCodeSearchInput.click();
        await this.countryCodeSearchInput.fill(country);
        await this.getCountryOptionByText(country).click();
        await this.phoneNumberInput.fill(phoneNumber);
    }

    public async enterDietComment(comment: string = 'No restrictions'): Promise<void> {
        await this.commentTextArea.fill(comment);
    }
}