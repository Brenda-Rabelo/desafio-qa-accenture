import { When, Then } from '@badeball/cypress-cucumber-preprocessor'

const ordemCrescente = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']

function arrastar(origem, destino) {
  cy.contains('.vertical-list-container .list-group-item', origem).then(($origem) => {
    cy.contains('.vertical-list-container .list-group-item', destino).then(($destino) => {
      const itens = [...$origem[0].parentElement.querySelectorAll('.list-group-item')]
      const indiceOrigem = itens.indexOf($origem[0])
      const indiceDestino = itens.indexOf($destino[0])
      const caixa = $destino[0].getBoundingClientRect()
      const clientX = caixa.left + caixa.width / 2
      const clientY = indiceOrigem > indiceDestino ? caixa.top + 4 : caixa.bottom - 4

      cy.window().then((win) => {
        const dataTransfer = new win.DataTransfer()
        cy.wrap($origem).trigger('dragstart', { dataTransfer, force: true })
        cy.wait(100)
        cy.wrap($destino)
          .trigger('dragenter', { dataTransfer, clientX, clientY, force: true })
          .trigger('dragover', { dataTransfer, clientX, clientY, force: true })
          .trigger('drop', { dataTransfer, clientX, clientY, force: true })
        cy.wrap($origem).trigger('dragend', { dataTransfer, force: true })
      })
    })
  })
}

When('escolho Interactions e Sortable', () => {
  cy.contains('Interactions').click()
  cy.get('body').then(($body) => {
    $body.find('iframe').remove()
  })
  cy.contains('Sortable').click()
})

When('arrasto os itens da lista para a ordem crescente', () => {
  arrastar('Six', 'One')
  ordemCrescente.forEach((item, indice) => {
    cy.get('.vertical-list-container .list-group-item').eq(indice).invoke('text').then((texto) => {
      if (texto.trim() !== item) {
        arrastar(item, texto.trim())
      }
    })
  })
})

Then('a lista fica em ordem crescente', () => {
  cy.get('.vertical-list-container .list-group-item').then(($itens) => {
    const textos = [...$itens].map((item) => item.innerText.trim())
    expect(textos).to.deep.equal(ordemCrescente)
  })
})