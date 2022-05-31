describe('The Login Page', () => {
    beforeEach(()=>{
        cy.request('POST', '/api/customers/login', { phoneNumber: '09367205062', password: "111111" })
            .its('body')
            .as('userInfo')
    })
    it('sets auth cookie when logging in via form submission', function () {
        const { phoneNumber, name } = this.userInfo

        cy.visit('/login?activeTab=1')

        cy.get('input[id=phoneNumber]').type(phoneNumber)
        cy.get('input[id=password]').type(`111111{enter}`)
        cy.url().should('include', '/store/list')
        cy.getCookie('userInfo').should('exist')

        cy.get('span[id=user-info-name]').should('contain', name)
    })
})