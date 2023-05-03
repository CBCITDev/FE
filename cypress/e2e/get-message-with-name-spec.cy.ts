describe('User Journey', () => {
  
  it('can enter name and submit', () => {
    cy.visit('http://localhost:4200')

    // find input field 
    // then entern name: "Test"
    cy.get('[data-cy="name-input"]').type('Test').should('have.value', 'Test')

    // find submit button
    // then click button
    cy.get('[data-cy="submit-button"]').click()

    // find span element
    // backend should return personalised message
    cy.getByData('message').should('exist').contains("Hello Test")
  })
})