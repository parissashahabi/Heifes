describe('The Register Page', () => {

    it('creates new customer', function () {
        const phoneNumber = "09199999999";
        const city = 3;

        const { ostan } = require('iran-cities-json');

        cy.visit('/register')

        cy.get('input[id=phoneNumber]').type(`${phoneNumber}{enter}`)
        cy.get('input[id=validationCode]').type(`${Math.floor(100000 + Math.random() * 900000)}`)
        cy.get('input[id=password]').type("123456")
        cy.get('input[id=confirmPassword]').type(`123456{enter}`)
        cy.get('div[class="ant-select-selector"]').click()
        cy.get(`div[title="${ostan[city].name}"]`).click()
        cy.get('button').click()
        cy.url().should('include', '/store/list')
        cy.getCookie('userInfo').should('exist')

        cy.get('span[id=user-info-name]').should('contain', phoneNumber)
    })
})