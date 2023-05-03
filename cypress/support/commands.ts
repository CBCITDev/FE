/// <reference types="cypress" />

Cypress.Commands.add("getByData", (selector: any) => {
    return cy.get(`[data-test=${selector}]`)
  })
  