describe('The Store Page', {viewportWidth: 993,},() => {
    beforeEach(()=>{
        cy.request('POST', '/api/customers/login', { phoneNumber: '09367205062', password: "111111" })
            .its('body')
            .as('userInfo')
    })
    it('shopping some products',  function () {
        const { phoneNumber, city, token } = this.userInfo
        const c = String(city)
        cy.visit('/login?activeTab=1')

        cy.get('input[id=phoneNumber]').type(phoneNumber)
        cy.get('input[id=password]').type(`111111{enter}`)
        cy.url().should('include', '/store/list')
        cy.getCookie('userInfo').should('exist')
        cy.request('GET',`/api/supermarkets/${c}`, {
            headers: { authorization: `Bearer ${token}` },
        })

        cy.get('div[id=supermarket-details-card-0]').click()
        cy.get('button[id=add-to-card]').click({ multiple: true })
        cy.get('a[id=cart-link]').click()
        // cy.get('div[class=ant-select-selector]').click()
        // cy.get(`div[title="2"]`).click()
        cy.get(`button[id=check-out]`).click()
        cy.url().should('include', '/receipt')
        cy.getCookie('cartItems').should('be.a', 'null')
    })
})