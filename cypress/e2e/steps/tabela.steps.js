import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

let registrosDaLista = []

const linhaDaTabela = (texto) => {
  return cy.get('.web-tables-wrapper tbody').contains('td', texto).parent('tr')
}

When('escolho Elements e Web Tables', () => {
  cy.contains('Elements').click()
  cy.get('body').then(($body) => {
    $body.find('iframe').remove()
  })
  cy.contains('Web Tables').click()
})

When('crio um novo registro', () => {
  cy.get('#addNewRecordButton').click()
  cy.get('#firstName').type('Brenda')
  cy.get('#lastName').type('Rabelo')
  cy.get('#userEmail').type('brendarabelotester@gmail.com')
  cy.get('#age').type('30')
  cy.get('#salary').type('5000')
  cy.get('#department').type('QA')
  cy.get('footer').invoke('hide')
  cy.get('#submit').click({ force: true })
  cy.get('.modal-header').should('not.exist')
})

Then('o novo registro aparece na tabela', () => {
  linhaDaTabela('Brenda')
    .should('contain', 'Rabelo')
    .and('contain', 'brendarabelotester@gmail.com')
    .and('contain', '30')
    .and('contain', '5000')
    .and('contain', 'QA')
})

When('edito o novo registro criado', () => {
  cy.get('body').then(($body) => {
    $body.find('iframe').remove()
  })
  linhaDaTabela('Brenda').find('[title="Edit"]').click({ force: true })
  cy.get('#department').clear().type('Automação')
  cy.get('footer').invoke('hide')
  cy.get('#submit').click({ force: true })
  cy.get('.modal-header').should('not.exist')
})

Then('o registro editado aparece na tabela', () => {
  linhaDaTabela('Brenda')
    .should('contain', 'Automação')
    .and('not.contain', 'QA')
})

When('deleto o novo registro criado', () => {
  cy.get('body').then(($body) => {
    $body.find('iframe').remove()
  })
  linhaDaTabela('Brenda').find('[title="Delete"]').click({ force: true })
})

Then('o registro não aparece na tabela', () => {
  cy.get('.web-tables-wrapper tbody').should('not.contain', 'brendarabelotester@gmail.com')
})

When('crio os registros da lista', (tabela) => {
  registrosDaLista = tabela.hashes()
  registrosDaLista.forEach((linha) => {
    cy.get('body').then(($body) => {
      $body.find('iframe').remove()
    })
    cy.get('#addNewRecordButton').click()
    cy.get('#firstName').type(linha.nome)
    cy.get('#lastName').type(linha.sobrenome)
    cy.get('#userEmail').type(linha.email)
    cy.get('#age').type(linha.idade)
    cy.get('#salary').type(linha.salario)
    cy.get('#department').type(linha.departamento)
    cy.get('footer').invoke('hide')
    cy.get('#submit').click({ force: true })
    cy.get('.modal-header').should('not.exist')
  })
})

Then('os registros da lista aparecem na tabela', () => {
  registrosDaLista.forEach((linha) => {
    cy.get('#searchBox').clear().type(linha.nome)
    linhaDaTabela(linha.nome).should('contain', linha.sobrenome).and('contain', linha.email)
  })
  cy.get('#searchBox').clear()
})

When('deleto todos os registros da lista', () => {
  cy.get('#searchBox').clear()
  registrosDaLista.forEach((linha) => {
    cy.get('body').then(($body) => {
      $body.find('iframe').remove()
    })
    cy.get('.web-tables-wrapper tbody').then(($tabela) => {
      if ($tabela.text().includes(linha.email)) {
        linhaDaTabela(linha.nome).find('[title="Delete"]').click({ force: true })
      }
    })
  })
})

Then('os registros da lista não aparecem na tabela', () => {
  registrosDaLista.forEach((linha) => {
    cy.get('.web-tables-wrapper tbody').should('not.contain', linha.email)
  })
  linhaDaTabela('Cierra').should('be.visible')
})