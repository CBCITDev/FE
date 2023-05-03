/// <reference types="Cypress" />

import cypressConfig from "cypress.config"

describe('greeting service homepage', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200')
    // cy.visit('');
  })

  it("the h1 contains the correct text", () => {
    cy.getByData("greeting-service-heading").contains("Welcome to the Greeting service!")
  })

  it("the h2 contains the correct text", () => {
    cy.getByData("person-question").contains('Which person do you want to greet?')
  })

  it("the label contains the correct text", () => {
    cy.getByData("label-name").contains('name:')
  })

  it("the input exists", () => {
    cy.get("[data-cy = 'name-input']")
  
  })

  it("the submit button contains the correct text", () => {
    cy.get("[data-cy = 'submit-button']").contains('Submit')
  
  })
})