import cypressConfig from "cypress.config"

describe('input validation spec', () => {
  it('user should only be able to enter letters in input field', () => {
    cy.visit('http://localhost:4200')

    cy.get('[data-cy="name-input"]')
      // enter valid input
      .type('test')
      .should('have.value', 'test')
      // enter special characters and numbers
      // characters other than letters should not be displayed
      .type('%&_34')
      .should('have.value', 'test')
      // delete input
      .type('{selectall}{backspace}')
      .should('have.value', '')
  })
})