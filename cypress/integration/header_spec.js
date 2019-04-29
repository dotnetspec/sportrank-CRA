describe('Header Tests', function() {
  it('Successfully loads initial header', function() {
    cy.GlobalSeed()

    cy.get('[data-cy=deactive]')
    .should('not.be.visible')

    cy.get('[data-cy=reactive]')
    .should('not.be.visible')

    cy.get('[data-cy=ListAllRankings]')
    .should('be.visible')

    cy.get('[data-cy=UpdateProfile]')
    .should('be.visible')

    cy.get('[data-cy=CreateNewRanking]')
    .should('be.visible')

    //getting [data-cy=usernameinprofilelink] makes
    //<span.username visible ie. it returns the whole html element
    //not just the value e.g. 'player1'
    cy.get('[data-cy=usernameinprofilelink]')
    //.should('eq', 'player1')
    .should('be.visible')
    .contains('player1')
  })

  it('On view click', function() {
    cy.RankingSeedViaGlobalViewBtn()
    //now test the header display
    cy.get('[data-cy=deactivate]')
    .should('be.visible')

    cy.get('[data-cy=reactivate]')
    .should('be.visible')

    cy.get('[data-cy=ListAllRankings]')
    .should('be.visible')

    cy.get('[data-cy=UpdateProfile]')
    .should('be.visible')

    cy.get('[data-cy=CreateNewRanking]')
    .should('be.visible')

    cy.get('[data-cy=usernameinprofilelink]')
    //.should('eq', 'player1')
    .should('be.visible')
    .contains('player1')
  })

})
