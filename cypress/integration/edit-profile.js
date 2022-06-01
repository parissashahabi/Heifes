describe('The Edit Profile Page', {viewportWidth: 993,},() => {
    beforeEach(()=>{
        cy.request('POST', '/api/customers/login', { phoneNumber: '09367205062', password: "111111" })
            .its('body')
            .as('userInfo')

    })
    it('editing customer profile',  {defaultCommandTimeout: 10000},function () {
        const { phoneNumber, name, city, token } = this.userInfo
        const c = String(city)
        cy.visit('/login?activeTab=1')

        cy.get('input[id=phoneNumber]').type(phoneNumber)
        cy.get('input[id=password]').type(`111111{enter}`)
        cy.url().should('include', '/store/list')
        cy.getCookie('userInfo').should('exist')
        cy.request('GET',`/api/supermarkets/${c}`, {
            headers: { authorization: `Bearer ${token}` },
        })

        const { ostan } = require('iran-cities-json');

        cy.get('span[id=user-info-name]').click()
        cy.get('li[id=profile]').click()
        cy.url().should('include', '/dashboard')
        cy.get('div[id="rc-tabs-3-tab-2"]').click({force: true})
        cy.get('button[id="edit"]').click()
        cy.get('input[id=name]').clear({force: true}).type(`${name}${Math.floor(10 + Math.random() * 90)}`, {force: true})
        cy.get('div[class="ant-select-selector"]').click()
        cy.get(`div[title="${ostan[2].name}"]`).click()
        cy.get('button[id="submit"]').click()

        cy.get('input[id=name]').should("be.disabled")


    })
})