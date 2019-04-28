/// <reference types="Cypress" />

context('Connectors', () => {
  beforeEach(() => {
    //cy.visit('https://example.cypress.io/commands/connectors')
    cy.RankingSeedViaGlobalViewBtn()
  })

  it('.invoke() - invoke a function on the current subject', () => {
      // call the jquery method 'show' on the 'div.container'
      cy.get('[tabindex="5"] > button').click()
      //currently this invoke isn't doing anything
      cy.get('.modal-content').invoke('show').should('be.visible')
      //.should('be.visible')
  })
})
