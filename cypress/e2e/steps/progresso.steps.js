import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

When('escolho Widgets e Progress Bar', () => {
  cy.contains('Widgets').click()
  cy.get('body').then(($body) => {
    $body.find('iframe').remove()
  })
  cy.contains('Progress Bar').click()
})

When('inicio a barra e paro antes de 25%', () => {
  cy.get('#startStopButton').click()
  cy.get('[role="progressbar"]').should(($barra) => {
    const valor = Number($barra.attr('aria-valuenow'))
    expect(valor).to.be.greaterThan(0).and.lessThan(25)
  })
  cy.get('#startStopButton').click()
})

Then('o valor da barra é menor ou igual a 25%', () => {
  cy.get('[role="progressbar"]').should(($barra) => {
    const valor = Number($barra.attr('aria-valuenow'))
    expect(valor).to.be.at.most(25)
  })
})

When('inicio a barra novamente até 100%', () => {
  cy.get('#startStopButton').click()
  cy.get('[role="progressbar"]', { timeout: 20000 }).should('have.attr', 'aria-valuenow', '100')
})

When('reseto a barra de progresso', () => {
  cy.wait(300)
  cy.get('#resetButton').click()
})

Then('a barra volta para 0%', () => {
  cy.get('[role="progressbar"]').should('have.attr', 'aria-valuenow', '0')
})