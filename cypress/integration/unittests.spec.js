//import { HelloState } from '../../src/hello-x.jsx'
import EnterResult from '../../src/app/js/components/Logic/EnterResult'
import React from 'react'
describe('EnterResult component', () => {
  it.only('works', () => {
    // mount the component under test
    cy.mount(<EnterResult />)
    // start testing!
    cy.contains('won')
    // mounted component can be selected via its name, function, or JSX
    // e.g. '@HelloState', HelloState, or <HelloState />
    cy.get(EnterResult)
      .invoke('setState', { resultHasChanged: false })
    cy.get(EnterResult)
      .its('state')
      .should('deep.equal', { resultHasChanged: true })
    // check if GUI has rerendered
    cy.contains('won')
  })
})
