import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
const contexto = {}

Given('que eu crio um usuário na API do DemoQA', () => {
  const usuario = `brenda_${Date.now()}`
  const senha = 'Teste@123'

  contexto.usuario = usuario
  contexto.senha = senha

  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/User',
    body: {
      userName: usuario,
      password: senha
    }
  }).then((resposta) => {
    expect(resposta.status).to.eq(201)
    contexto.userID = resposta.body.userID
  })
})

When('gero um token de acesso', () => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/GenerateToken',
    body: {
      userName: contexto.usuario,
      password: contexto.senha
    }
  }).then((resposta) => {
    expect(resposta.status).to.eq(200)
    expect(resposta.body.status).to.eq('Success')
    contexto.token = resposta.body.token
  })
})

When('confirmo que o usuário está autorizado', () => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Authorized',
    body: {
      userName: contexto.usuario,
      password: contexto.senha
    }
  }).then((resposta) => {
    expect(resposta.status).to.eq(200)
    expect(resposta.body).to.eq(true)
  })
})

When('consulto a lista de livros', () => {
  cy.request({
    method: 'GET',
    url: 'https://demoqa.com/BookStore/v1/Books'
  }).then((resposta) => {
    expect(resposta.status).to.eq(200)
    expect(resposta.body.books.length).to.be.greaterThan(1)
    contexto.isbn1 = resposta.body.books[0].isbn
    contexto.isbn2 = resposta.body.books[1].isbn
  })
})

When('alugo dois livros para esse usuário', () => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/BookStore/v1/Books',
    headers: {
      Authorization: `Bearer ${contexto.token}`
    },
    body: {
      userId: contexto.userID,
      collectionOfIsbns: [
        { isbn: contexto.isbn1 },
        { isbn: contexto.isbn2 }
      ]
    }
  }).then((resposta) => {
    expect(resposta.status).to.eq(201)
  })
})

Then('os detalhes do usuário mostram os dois livros alugados', () => {
  cy.request({
    method: 'GET',
    url: `https://demoqa.com/Account/v1/User/${contexto.userID}`,
    headers: {
      Authorization: `Bearer ${contexto.token}`
    }
  }).then((resposta) => {
    expect(resposta.status).to.eq(200)
    const isbns = resposta.body.books.map((livro) => livro.isbn)
    expect(isbns).to.have.length(2)
    expect(isbns).to.include.members([contexto.isbn1, contexto.isbn2])
  })
})