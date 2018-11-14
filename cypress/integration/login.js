describe('podQuest - Login', function() {


    it('Visits the site and logs in', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.url().should('include','/login')
        cy.get('input#username').type('thereyou2').should('have.value','thereyou2')
        cy.get('input#password').type('password123').should('have.value','password123')
        cy.get('button.login-button').click()
        cy.url().should('include','/dashboard')
    });
    it('Visits the site and gives wrong login username', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.url().should('include','/login')
        cy.get('input#username').type('thereyou5').should('have.value','thereyou5')
        cy.get('input#password').type('password123').should('have.value','password123')
        cy.get('button.login-button').click()
        cy.get('.form-error').contains('Incorrect username or password')
    });
    it('Visits the site and logs in then logs out', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('input#username').type('thereyou2').should('have.value','thereyou2')
        cy.get('input#password').type('password123').should('have.value','password123')
        cy.get('button.login-button').click()
        cy.get('.nav-logout').click()
        cy.url().should('not.match',/dashboard/)
    });
    it('Visits the dashboard without logging in', function() {
        cy.visit('http://localhost:3000/dashboard')
        cy.url().should('not.match',/dashboard/)
    });
    it('Visits the channel page without logging in', function() {
        cy.visit('http://localhost:3000/channel')
        cy.url().should('not.contain','channel')
    });
    it('Visits the favorites page without logging in', function() {
        cy.visit('http://localhost:3000/favorites')
        cy.url().should('not.match',/favorites/)
    });
})