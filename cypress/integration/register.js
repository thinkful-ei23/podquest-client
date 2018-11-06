describe('My First Test', function() {
    it('Visits the Kitchen Sink', function() {
        cy.visit('http://localhost:3000')
        cy.contains('Register').click()
        cy.get('input#email').type('hello')
        cy.get('input#username').type('there you2')
        cy.get('input#password').type('password123')
        cy.get('input#passwordConfirm').type('password123')
        cy.get('button.submit-button').click()
    })
})