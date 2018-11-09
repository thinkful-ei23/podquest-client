describe('podQuest -Register page', function() {
    it('Registers a new user', function() {
        const number = Math.floor(Math.random()*10000)
        cy.visit('http://localhost:3000')
        cy.contains('Register').click()
        cy.get('input#email').type('hello@email.com')
        cy.get('input#username').type(`thereyou${number}`)
        cy.get('input#password').type('password123')
        cy.get('input#passwordConfirm').type('password123')
        cy.get('button.submit-button').click()
        cy.url().should('match',/dashboard/)
        
    });
    it('Does not register a new user due to no password',function(){
        cy.visit('http://localhost:3000')
        cy.contains('Register').click()
        cy.get('input#email').type('hello@email.com')
        cy.get('input#username').type('thereyou3')
        cy.get('button.submit-button').click()
        cy.get('.form-error').contains('Required')
    });
    it('Does not register a new user due to no username',function(){
        cy.visit('http://localhost:3000')
        cy.contains('Register').click()
        cy.get('input#email').type('hello@email.com')
        cy.get('input#password').type('password123')
        cy.get('input#passwordConfirm').type('password123')
        cy.get('button.submit-button').click()
        cy.get('.form-error').contains('Required')
    });    
    it('Does not register a new user due to no email',function(){
        cy.visit('http://localhost:3000')
        cy.contains('Register').click()
        cy.get('input#username').type('thereyou3')
        cy.get('input#password').type('password123')
        cy.get('input#passwordConfirm').type('password123')
        cy.get('button.submit-button').click()
        cy.get('.form-error').contains('Must be a valid email address')
    });
})