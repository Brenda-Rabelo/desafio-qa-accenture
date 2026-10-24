# language: pt
Funcionalidade: Formulário de prática do DemoQA

  Cenário: Enviar o cadastro e fechar o popup
    Dado que acesso a página inicial do DemoQA
    Quando escolho Forms e Practice Form
    E preencho o formulário com os dados da aluna
    E submeto o formulário
    Então o popup de confirmação aparece com os dados enviados
    E fecho o popup

  Cenário: Não enviar o formulário vazio
    Dado que acesso o Practice Form diretamente
    Quando submeto o formulário
    Então o popup de confirmação não aparece
    E os campos obrigatórios ficam inválidos

  Cenário: Não enviar com e-mail inválido
    Dado que acesso o Practice Form diretamente
    Quando preencho os obrigatórios com um e-mail inválido
    E submeto o formulário
    Então o popup de confirmação não aparece
    E o campo de e-mail fica inválido