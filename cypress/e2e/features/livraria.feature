# language: pt
Funcionalidade: Conta e livraria da API do DemoQA

  Cenário: Criar usuário, autorizar e alugar dois livros
    Dado que eu crio um usuário na API do DemoQA
    Quando gero um token de acesso
    E confirmo que o usuário está autorizado
    E consulto a lista de livros
    E alugo dois livros para esse usuário
    Então os detalhes do usuário mostram os dois livros alugados