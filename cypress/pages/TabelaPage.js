class TabelaPage {
    constructor() {
        this.registrosDaLista = []
    }

    removerAnuncios() {
        cy.get('body').then(($body) => {
            $body.find('iframe').remove()
        })
    }

    linha(texto) {
        return cy.get('.web-tables-wrapper tbody').contains('td', texto).parent('tr')
    }

    abrir() {
        cy.contains('Elements').click()
        this.removerAnuncios()
        cy.contains('Web Tables').click()
    }

    criarRegistro() {
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
    }

    conferirRegistroCriado() {
        this.linha('Brenda')
            .should('contain', 'Rabelo')
            .and('contain', 'brendarabelotester@gmail.com')
            .and('contain', '30')
            .and('contain', '5000')
            .and('contain', 'QA')
    }

    editarRegistro() {
        this.removerAnuncios()
        this.linha('Brenda').find('[title="Edit"]').click({ force: true })
        cy.get('#department').clear().type('Automação')
        cy.get('footer').invoke('hide')
        cy.get('#submit').click({ force: true })
        cy.get('.modal-header').should('not.exist')
    }

    conferirRegistroEditado() {
        this.linha('Brenda').should('contain', 'Automação').and('not.contain', 'QA')
    }

    deletarRegistro() {
        this.removerAnuncios()
        this.linha('Brenda').find('[title="Delete"]').click({ force: true })
    }

    conferirRegistroAusente() {
        cy.get('.web-tables-wrapper tbody').should('not.contain', 'brendarabelotester@gmail.com')
    }

    criarLista(tabela) {
        this.registrosDaLista = tabela.hashes()
        this.registrosDaLista.forEach((linha) => {
            this.removerAnuncios()
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
    }

    conferirLista() {
        this.registrosDaLista.forEach((linha) => {
            cy.get('#searchBox').clear().type(linha.nome)
            this.linha(linha.nome).should('contain', linha.sobrenome).and('contain', linha.email)
        })
        cy.get('#searchBox').clear()
    }

    deletarLista() {
        cy.get('#searchBox').clear()
        this.registrosDaLista.forEach((linha) => {
            this.removerAnuncios()
            cy.get('.web-tables-wrapper tbody').then(($tabela) => {
                if ($tabela.text().includes(linha.email)) {
                    this.linha(linha.nome).find('[title="Delete"]').click({ force: true })
                }
            })
        })
    }

    conferirListaAusente() {
        this.registrosDaLista.forEach((linha) => {
            cy.get('.web-tables-wrapper tbody').should('not.contain', linha.email)
        })
        this.linha('Cierra').should('be.visible')
    }
}

export default new TabelaPage()