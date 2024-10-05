describe('login', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/~e200033/')

    cy.contains('Authentification').click()

    cy.get('#login').type('jeffcheasey88')
    cy.get('#password').type('jeffcheasey88')
    cy.get('#con').click()

    cy.contains('Invitations')
  })
})

