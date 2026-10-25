class OrdenacaoPage {
    constructor() {
        this.ordemCrescente = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']
    }

    removerAnuncios() {
        cy.get('body').then(($body) => {
            $body.find('iframe').remove()
        })
    }

    abrir() {
        cy.contains('Interactions').click()
        this.removerAnuncios()
        cy.contains('Sortable').click()
    }

    arrastar(origem, destino) {
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

    ordenar() {
        this.arrastar('Six', 'One')
        this.ordemCrescente.forEach((item, indice) => {
            cy.get('.vertical-list-container .list-group-item').eq(indice).invoke('text').then((texto) => {
                if (texto.trim() !== item) {
                    this.arrastar(item, texto.trim())
                }
            })
        })
    }

    conferirOrdem() {
        cy.get('.vertical-list-container .list-group-item').then(($itens) => {
            const textos = [...$itens].map((item) => item.innerText.trim())
            expect(textos).to.deep.equal(this.ordemCrescente)
        })
    }
}

export default new OrdenacaoPage()