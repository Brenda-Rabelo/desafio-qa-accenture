import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

When('escolho Alerts, Frame & Windows e Browser Windows', () => {
  cy.contains('Alerts, Frame & Windows').click()
  cy.get('body').then(($body) => {
    $body.find('iframe').remove()
  })
  cy.contains('Browser Windows').click()
})

When('clico em New Window', () => {
    cy.window().then((win) => {
        cy.stub(win, 'open').as('novaJanela')
    })
    cy.get('#windowButton').click()
})

Then('uma nova janela abre na página de exemplo', () => {
    cy.get('@novaJanela').should('be.called')
    cy.visit('https://demoqa.com/sample')
})

Then('a mensagem "This is a sample page" aparece', () => {
  cy.get('#sampleHeading').should('be.visible').and('have.text', 'This is a sample page')
})

Then('fecho a nova janela', () => {
  cy.go('back')
  cy.get('#windowButton').should('be.visible')
})