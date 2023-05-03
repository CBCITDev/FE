
describe('User Journey', () => {

  it('can submit without a name', () => {
    cy.visit('http://localhost:4200')

    // find input field 
    cy.get('[data-cy="name-input"]').should('have.value', '')

    // find submit button
    // then click button
    cy.get('[data-cy="submit-button"]').click()

    // cy.wait('@backend') // waiting upon the backend alias

    // find span element
    // backend should return correct response 
    cy.getByData('message').should('exist').contains("Hello from RESTEasy Reactive")
  })
})
