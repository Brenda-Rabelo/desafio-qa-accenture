import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import ordenacaoPage from '../../pages/OrdenacaoPage'

When('escolho Interactions e Sortable', () => {
    ordenacaoPage.abrir()
})

When('arrasto os itens da lista para a ordem crescente', () => {
    ordenacaoPage.ordenar()
})

Then('a lista fica em ordem crescente', () => {
    ordenacaoPage.conferirOrdem()
})