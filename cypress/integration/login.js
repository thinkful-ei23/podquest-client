describe('podQuest - Login', function() {
    it('Visits the site and logs in', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('input#username').type('there you2')
        cy.get('input#password').type('password123')
        cy.get('button.login-button').click()
        cy.get('input#search-input').type('joe').type('{enter}')
        cy.contains('The Joe Rogan Experience').click()
        cy.get('#episode-select').select('#1192 - Tony Hinchcliffe').wait(3000)
        cy.get('button.play-button').click()
        cy.get('button.stop-button').wait(2000).click()
        cy.get('.btn-logout').click()
    });
})