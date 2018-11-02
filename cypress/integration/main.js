describe('podQuest - Login', function() {
    it('Visits the site and logs in', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('input#username').type('there you2')
        cy.get('input#password').type('password123')
        cy.get('button.login-button').click()
    });
    it('Visits the site and logs in then logs out', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('input#username').type('there you2')
        cy.get('input#password').type('password123')
        cy.get('button.login-button').click()
        cy.get('.btn-logout').click()
    });
    it('Visits the site and searchs for podcasts', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('input#username').type('there you2')
        cy.get('input#password').type('password123')
        cy.get('button.login-button').click()
        cy.get('input#search-input').type('joe').type('{enter}')
    });
    it('Selects a podcast and clicks to listen', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('input#username').type('there you2')
        cy.get('input#password').type('password123')
        cy.get('button.login-button').click()
        cy.get('input#search-input').type('code').type('{enter}')
        cy.contains('Code Switch').click()
        cy.get('#episode-select').select('Word Up').wait(3000)
        cy.get('button.play-button').click()
        cy.get('button.stop-button').wait(2000).click()
    });
})