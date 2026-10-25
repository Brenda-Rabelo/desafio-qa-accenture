import formularioPage from '../pages/FormularioPage'

describe('Formulário de prática', () => {
  it('preenche o formulário e fecha o popup', () => {
    cy.visit('https://demoqa.com/')
    formularioPage.abrir()
    formularioPage.preencherDadosDaAluna()
    formularioPage.submeter()
    formularioPage.conferirPopup()
    formularioPage.fecharPopup()
  })

  it('nao envia o formulario vazio', () => {
    formularioPage.visitarDireto()
    formularioPage.submeter()
    formularioPage.conferirPopupAusente()
    formularioPage.conferirObrigatoriosInvalidos()
  })

  it('nao envia com email invalido', () => {
    formularioPage.visitarDireto()
    formularioPage.preencherEmailInvalido()
    formularioPage.submeter()
    formularioPage.conferirPopupAusente()
    formularioPage.conferirEmailInvalido()
  })
})