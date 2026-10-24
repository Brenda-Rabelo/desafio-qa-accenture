import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'

When('escolho Forms e Practice Form', () => {
  cy.contains('Forms').click()
  cy.get('body').then(($body) => {
    $body.find('iframe').remove()
  })
  cy.contains('Practice Form').click()
})

Given('que acesso a página inicial do DemoQA', () => {
  cy.visit('https://demoqa.com/')
})

When('preencho o formulário com os dados da aluna', () => {
  const nome = 'Brenda'
  const sobrenome = 'Rabelo'
  const email = 'brendarabelotester@gmail.com'
  const celular = '8598765432'
  const endereco = 'Rua Armando Monteiro, 540'

  cy.get('#firstName').type(nome)
  cy.get('#lastName').type(sobrenome)
  cy.get('#userEmail').type(email)
  cy.contains('Female').click()
  cy.get('#userNumber').type(celular)
  cy.get('#dateOfBirthInput').click()
  cy.get('.react-datepicker__year-select').select('1996')
  cy.get('.react-datepicker__month-select').select('February')
  cy.get('.react-datepicker__day--016').not('.react-datepicker__day--outside-month').click()
  cy.get('#subjectsInput').type('English')
  cy.contains('.subjects-auto-complete__option', 'English').click()
  cy.contains('Sports').click()
  cy.contains('Reading').click()
  cy.contains('Music').click()
  cy.get('#uploadPicture').selectFile('cypress/fixtures/arquivo.txt')
  cy.get('#currentAddress').type(endereco)
  cy.get('#state').click()
  cy.get('div[id*="option"]').contains('NCR').click()
  cy.get('#city').click()
  cy.get('div[id*="option"]').contains('Delhi').click()
})

When('submeto o formulário', () => {
  cy.get('footer').invoke('hide')
  cy.get('#submit').click({ force: true })
})

Then('o popup de confirmação aparece com os dados enviados', () => {
  cy.contains('Thanks for submitting the form').should('be.visible')
  cy.contains('Brenda Rabelo').should('be.visible')
  cy.contains('arquivo.txt').should('be.visible')
})

Then('fecho o popup', () => {
  cy.get('body').type('{esc}')
  cy.contains('Thanks for submitting the form').should('not.exist')
})

Given('que acesso o Practice Form diretamente', () => {
  cy.visit('https://demoqa.com/automation-practice-form')
})

Then('o popup de confirmação não aparece', () => {
  cy.contains('Thanks for submitting the form').should('not.exist')
})

Then('os campos obrigatórios ficam inválidos', () => {
  cy.get('#firstName').should('match', ':invalid')
  cy.get('#lastName').should('match', ':invalid')
  cy.get('#userNumber').should('match', ':invalid')
})

When('preencho os obrigatórios com um e-mail inválido', () => {
  cy.get('#firstName').type('Brenda')
  cy.get('#lastName').type('Rabelo')
  cy.contains('Female').click()
  cy.get('#userNumber').type('8598765432')
  cy.get('#userEmail').type('brenda.email')
})

Then('o campo de e-mail fica inválido', () => {
  cy.get('#userEmail').should('match', ':invalid')
})