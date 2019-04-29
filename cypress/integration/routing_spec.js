describe('Routing', () => {
    it('View btn click Home route', () => {
        //cy.RankingSeedViaGlobalViewBtn()
        cy.GlobalSeed()
        cy.route('GET', '/', 'fixture:ranking1')
        //wait for the player1 username to load
        //REVIEW: this must be improved ...
        cy.wait(2000)
        cy.get('tbody>tr>td').contains("View").as('firstViewBtn')
        //cy.wait(800)
          cy.get('@firstViewBtn').click({force: true})
        cy.url()
        .should('include', '/home/@player1')
      })
  })
