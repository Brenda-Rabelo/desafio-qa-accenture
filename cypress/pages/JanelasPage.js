class JanelasPage {
    removerAnuncios() {
        cy.get('body').then(($body) => {
            $body.find('iframe').remove()
        })
    }

    abrir() {
        cy.contains('Alerts, Frame & Windows').click()
        this.removerAnuncios()
        cy.contains('Browser Windows').click()
    }

    clicarNovaJanela() {
        cy.window().then((win) => {
            cy.stub(win, 'open').as('novaJanela')
        })
        cy.get('#windowButton').click()
    }

    conferirNovaJanela() {
        cy.get('@novaJanela').should('be.called')
        cy.visit('https://demoqa.com/sample')
    }

    conferirMensagem() {
        cy.get('#sampleHeading').should('be.visible').and('have.text', 'This is a sample page')
    }

    fecharNovaJanela() {
        cy.go('back')
        cy.get('#windowButton').should('be.visible')
    }
}

export default new JanelasPage()