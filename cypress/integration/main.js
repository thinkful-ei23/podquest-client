describe('podQuest - Login', function() {
    it('Visits the site and logs in', function() {
        cy.visit('/')
        cy.contains('Login').click()
        cy.url().should('include','/login')
        cy.get('input#username').type('there you2').should('have.value','there you2')
        cy.get('input#password').type('password123').should('have.value','password123')
        cy.get('button.login-button').click()
        cy.url().should('include','/dashboard')
    });
    it('Visits the site and logs in then logs out', function() {
        cy.visit('/')
        cy.contains('Login').click()
        cy.get('input#username').type('there you2').should('have.value','there you2')
        cy.get('input#password').type('password123').should('have.value','password123')
        cy.get('button.login-button').click()
        cy.get('.btn-logout').click()
        cy.url().should('include','/')
    });
    it('Visits the site and searchs for podcasts', function() {
        cy.visit('/')
        cy.contains('Login').click()
        cy.get('input#username').type('there you2').should('have.value','there you2')
        cy.get('input#password').type('password123').should('have.value','password123')
        cy.get('button.login-button').click()
        cy.get('input#search-input').type('joe').should('have.value','joe').type('{enter}')
    });
    it('Selects a podcast and clicks to listen', function() {
        cy.visit('/')
        // cy.contains('Login').click()
        // cy.get('input#username').type('there you2').should('have.value','there you2')
        // cy.get('input#password').type('password123').should('have.value','password123')
        // cy.get('button.login-button').click()
        cy.request('POST', '/api/auth/login', { username: 'there you2',password:'password123' }).its('body').as('currentUser')
        cy.get('input#search-input').type('code').type('{enter}')
        cy.contains('Code Switch').click()
        cy.get('#episode-select').select('Word Up')
        cy.get('button.play-button').click()
        cy.get('button.stop-button').wait(2000).click()
        cy.get('.btn-logout').click()
    });
})