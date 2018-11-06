describe('podQuest - Searching', function() {

    Cypress.Commands.add('login', () => { 
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/auth/login',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({ username:"there you2", password:"password123"})
        })
        .then((resp) => {
            localStorage.setItem('authToken', resp.body.authToken)
        })
    })
    
    beforeEach(() => {
        cy.login()
    })

    it('Visits the site and searchs for podcasts', function() {
        cy.visit('http://localhost:3000/dashboard')
        cy.get('input#search-input').type('joe').should('have.value','joe').type('{enter}')
    });
    it('Selects a podcast and clicks to listen', function() {
        cy.visit('http://localhost:3000/dashboard')
        cy.get('input#search-input').type('code').type('{enter}')
        cy.contains('Code Switch').click()
        cy.get('#episode-select').select('Word Up')
        cy.get('button.play-button').click()
        cy.get('button.stop-button').wait(2000).click()
        cy.get('.btn-logout').click()
    });
})
