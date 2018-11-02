describe('podQuest - Login', function() {
    it('Visits the site and logs in', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Login').click()
        cy.get('input#username').type('there you2')
        cy.get('input#password').type('password123')
        cy.get('button.login-button').click()
    });
  })