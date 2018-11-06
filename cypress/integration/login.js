describe('podQuest - Login', function() {


    it('Visits the site and logs in', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.url().should('include','/login')
        cy.get('input#username').type('there you2').should('have.value','there you2')
        cy.get('input#password').type('password123').should('have.value','password123')
        cy.get('button.login-button').click()
        cy.url().should('include','/dashboard')
    });
    it('Visits the site and logs in then logs out', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('input#username').type('there you2').should('have.value','there you2')
        cy.get('input#password').type('password123').should('have.value','password123')
        cy.get('button.login-button').click()
        cy.get('.btn-logout').click()
        cy.url().should('include','/')
    });
})