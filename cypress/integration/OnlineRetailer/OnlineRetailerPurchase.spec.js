import { Selectors, URLs } from "./Selectors";
describe('Purchase Galaxy S22 Ultra', () => {

    it('Visit Samsung website', () => {
        cy.visit('https://www.samsung.com/in/');
    })

    it('Select Galaxy S22 Ultra mobile', () => {
        cy.get(Selectors.mobileTab).click();
        cy.get(Selectors.galaxyS22UltraBuyButton).click();

    })

    it('Fill mobile hardware configurations', () => {
        cy.get(Selectors.noTradeIn).click()
        cy.get(Selectors.deviceMemorySize).click({ force: true })
        cy.get(Selectors.deviceColor).click({ force: true })
    })

    it('Enter invalid PinCode and assert validation', () => {
        cy.get(Selectors.deliveryPinCode).type('00972{enter}', { force: true })
        cy.get(Selectors.deliveryPinCodeValidation).should('exist');
    })

    it('Enter a valid PinCode', () => {
        cy.get(Selectors.deliveryPinCode).clear({ force: true })
        cy.get(Selectors.deliveryPinCode).type('110034{enter}', { force: true })
    })

    it('Add mobile to Cart', () => {
        cy.intercept(URLs.giftsURL).as("LoadDataCompleted")
        cy.get(Selectors.continueBuyingButton).click({ force: true, multiple: true })
        cy.wait("@LoadDataCompleted")

        cy.get(Selectors.giftSkipButton).click({ force: true })
        cy.get(Selectors.addOnsSkipButton).click({ force: true })

        cy.get(Selectors.continueToCartButton).click({ force: true, multiple: true });

        cy.get(Selectors.continueAsGuestButton).click({ force: true })

    })

    it('Fill Shipping Delivary address data', () => {
        cy.get(Selectors.firstName).type('Razan');
        cy.get(Selectors.lastName).type('Jararah');
        cy.get(Selectors.address).type('Ramallah');

        cy.get(Selectors.postalCode).type('00972{enter}', { force: true })
        cy.get(Selectors.inputValidationMessage).should('exist');
        cy.get(Selectors.postalCode).clear({ force: true })
        cy.get(Selectors.postalCode).type('110034{enter}', { force: true })

        cy.get(Selectors.email).type('Razan@gmail.com');
        cy.get(Selectors.phone).type('1599134104');
        cy.get(Selectors.addressType).click({ force: true });
    })
})