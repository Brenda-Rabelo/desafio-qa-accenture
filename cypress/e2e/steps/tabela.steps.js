import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import tabelaPage from '../../pages/TabelaPage'

When('escolho Elements e Web Tables', () => {
  tabelaPage.abrir()
})

When('crio um novo registro', () => {
  tabelaPage.criarRegistro()
})

Then('o novo registro aparece na tabela', () => {
  tabelaPage.conferirRegistroCriado()
})

When('edito o novo registro criado', () => {
  tabelaPage.editarRegistro()
})

Then('o registro editado aparece na tabela', () => {
  tabelaPage.conferirRegistroEditado()
})

When('deleto o novo registro criado', () => {
  tabelaPage.deletarRegistro()
})

Then('o registro não aparece na tabela', () => {
  tabelaPage.conferirRegistroAusente()
})

When('crio os registros da lista', (tabela) => {
  tabelaPage.criarLista(tabela)
})

Then('os registros da lista aparecem na tabela', () => {
  tabelaPage.conferirLista()
})

When('deleto todos os registros da lista', () => {
  tabelaPage.deletarLista()
})

Then('os registros da lista não aparecem na tabela', () => {
  tabelaPage.conferirListaAusente()
})