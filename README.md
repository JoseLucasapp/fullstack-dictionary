# Fullstack Challenge - Dictionary

## Introdução

Este é um desafio para que possamos ver as suas habilidades como Fullstack Developer.

Nesse desafio você deverá desenvolver um aplicativo para listar palavras em inglês, utilizando como base a API [Free Dictionary API](https://dictionaryapi.dev/). O projeto a ser desenvolvido por você tem como objetivo exibir termos em inglês e gerenciar as palavras visualizadas, conforme indicado nos casos de uso que estão logo abaixo.

[SPOILER] As instruções de entrega e apresentação do challenge estão no final deste Readme (=

### Antes de começar
 
- Prepare o projeto para ser disponibilizado no Github, copiando o conteúdo deste repositório para o seu (ou utilize o fork do projeto e aponte para o Github). Confirme que a visibilidade do projeto é pública (não esqueça de colocar no readme a referência a este challenge);
- O projeto deve utilizar a Linguagem específica na sua Vaga (caso esteja se candidatando). Por exempo: Python, R, Scala e entre outras;
- Considere como deadline 5 dias a partir do início do desafio. Caso tenha sido convidado a realizar o teste e não seja possível concluir dentro deste período, avise a pessoa que o convidou para receber instruções sobre o que fazer.
- Documentar todo o processo de investigação para o desenvolvimento da atividade (README.md no seu repositório); os resultados destas tarefas são tão importantes do que o seu processo de pensamento e decisões à medida que as completa, por isso tente documentar e apresentar os seus hipóteses e decisões na medida do possível.
- O frontend e backend devem estar presentes dentro do mesmo repositório. 

### Instruções iniciais obrigatórias

- Utilize as seguintes tecnologias:

#### Tecnologias (Front-End):
- Com ou sem framework (React, Angular, Vue.js, Javascript Vanilla, ou outro da sua escolha)
- Estilização (Material UI, Semantic UI, Styled Components, etc). Ou escrever o seu proprio sob medida 👌
- CSS Flexbox + CSS Grid
- Design Mobile First
- Gestão de dados (Redux, Context API, Localstorage, etc)
- Conceitos de Programação Funcional em JS (pelo menos .map, .filter e .reduce)

Atente-se, ao desenvolver a aplicação front-end, para conceitos de usabilidade e adeque a interface com elementos visuais para os usuários do seu sistema.

#### Tecnologias (Back-End):
- API (Node.js, PHP, Ruby, ou outra da sua escolha) com ou sem uso de frameworks
- Banco de dados (Postgres, MySQL, MongoDB, etc).

Como sugestões, pode criar um banco de dados grátis **MongoDB** usando Atlas: https://www.mongodb.com/cloud/atlas. Para conhecer outras plataformas de banco de dados, acesse https://coodesh.com/blog/candidates/heroku-acabou-e-agora-veja-alternativas/

#### Organização:
- Separar o repositório do back do front
- Aplicação de padrões Clean Code
- Validação de chamadas assíncronas para evitar travamentos

### Modelo de Dados:

Conforme indicado na documentação da API, a estrutura de dados presente retorna as seguintes informações:

```json
[
    {
        "word": "hello",
        "phonetics": [
            {
                "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3",
                "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=75797336",
                "license": {
                    "name": "BY-SA 4.0",
                    "url": "https://creativecommons.org/licenses/by-sa/4.0"
                }
            },
            {
                "text": "/həˈləʊ/",
                "audio": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3",
                "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=9021983",
                "license": {
                    "name": "BY 3.0 US",
                    "url": "https://creativecommons.org/licenses/by/3.0/us"
                }
            },
            {
                "text": "/həˈloʊ/",
                "audio": ""
            }
        ],
        "meanings": [
            {
                "partOfSpeech": "noun",
                "definitions": [
                    {
                        "definition": "\"Hello!\" or an equivalent greeting.",
                        "synonyms": [],
                        "antonyms": []
                    }
                ],
                "synonyms": [
                    "greeting"
                ],
                "antonyms": []
            },
            {
                "partOfSpeech": "verb",
                "definitions": [
                    {
                        "definition": "To greet with \"hello\".",
                        "synonyms": [],
                        "antonyms": []
                    }
                ],
                "synonyms": [],
                "antonyms": []
            },
            {
                "partOfSpeech": "interjection",
                "definitions": [
                    {
                        "definition": "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "Hello, everyone."
                    },
                    {
                        "definition": "A greeting used when answering the telephone.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "Hello? How may I help you?"
                    },
                    {
                        "definition": "A call for response if it is not clear if anyone is present or listening, or if a telephone conversation may have been disconnected.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "Hello? Is anyone there?"
                    },
                    {
                        "definition": "Used sarcastically to imply that the person addressed or referred to has done something the speaker or writer considers to be foolish.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "You just tried to start your car with your cell phone. Hello?"
                    },
                    {
                        "definition": "An expression of puzzlement or discovery.",
                        "synonyms": [],
                        "antonyms": [],
                        "example": "Hello! What’s going on here?"
                    }
                ],
                "synonyms": [],
                "antonyms": [
                    "bye",
                    "goodbye"
                ]
            }
        ],
        "license": {
            "name": "CC BY-SA 3.0",
            "url": "https://creativecommons.org/licenses/by-sa/3.0"
        },
        "sourceUrls": [
            "https://en.wiktionary.org/wiki/hello"
        ]
    }
]
```

### Back-End:

Nessa etapa você deverá construir uma API Restful com as melhores práticas de desenvolvimento.

**Obrigatório 1** - Você deverá atender aos seguintes casos de uso:

- Como usuário, devo ser capaz de realizar login com usuário e senha
- Como usuário, devo ser capaz de visualizar a lista de palavras do dicionário
- Como usuário, devo ser capaz de guardar no histórico palavras já visualizadas
- Como usuário, devo ser capaz de visualizar o histórico de palavras já visualizadas
- Como usuário, deve ser capaz de guardar uma palavra como favorita
- Como usuário, deve ser capaz de apagar uma palavra favorita
- Internamente, a API deve fazer proxy da API Free Dictionary, pois assim o front irá acessar somente a sua API

**Obrigatório 2** - Você deverá desenvolver as seguintes rotas com suas requisições e respostas:

<details open>
<summary>[GET] /</summary>
<p>
Retornar a mensagem "Fullstack Challenge 🏅 - Dictionary"
</p>

```json
{
    "message": "Fullstack Challenge 🏅 - Dictionary"
}
```
</details>
<details open>
<summary>[POST] /auth/signup</summary>

```json
{
    "name": "User 1",
    "email": "example@email.com",
    "password": "test"
}
```

```json
{
    "id": "f3a10cec013ab2c1380acef",
    "name": "User 1",
    "token": "Bearer JWT.Token"
}
```
</details>
<details open>
<summary>[POST] /auth/signin</summary>

```json
{
    "email": "example@email.com",
    "password": "test"
}
```

```json
{
    "id": "f3a10cec013ab2c1380acef",
    "name": "User 1",
    "token": "Bearer JWT.Token"
}
```
</details>
<details open>
<summary>[GET] /entries/en</summary>
<p>
Retornar a lista de palavras do dicionário, com paginação e suporte a busca. O endpoint de paginação de uma busca hipotética deve retornar a seguinte estrutura:
<br/>
[GET]/entries/en?search=fire&limit=4
</p>

```json
{
    "results": [
        "fire",
        "firefly",
        "fireplace",
        "fireman"
    ],
    "totalDocs": 20,
    "page": 1,
    "totalPages": 5, 
    "hasNext": true,
    "hasPrev": false
}
```
</details>
<details open>
<summary>[GET] /entries/en/:word</summary>
<p>
Retornar as informações da palavra especificada e registra o histórico de acesso.
</p>
</details>
<details open>
<summary>[POST] /entries/en/:word/favorite</summary>
<p>
Salva a palavra na lista de favoritas (retorno de dados no body é opcional)
</p> 
</details>
<details open>
<summary>[DELETE] /entries/en/:word/unfavorite</summary>
<p>
Remover a palavra da lista de favoritas (retorno de dados no body é opcional)
</p>
</details> 
<details open>
<summary>[GET] /user/me</summary>
<p>
Retornar o perfil do usúario
</p>
</details> 
<details open>
<summary>[GET] /user/me/history</summary>
<p>
Retornar a lista de palavras visitadas
</p>

```json
{
    "results": [
        {
            "word": "fire",
            "added": "2022-05-05T19:28:13.531Z"
        },
        {
            "word": "firefly",
            "added": "2022-05-05T19:28:44.021Z"
        },
        {
            "word": "fireplace",
            "added": "2022-05-05T19:29:28.631Z"
        },
        {
            "word": "fireman",
            "added": "2022-05-05T19:30:03.711Z"
        }
    ],
    "totalDocs": 20,
    "page": 2,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": true
}
```
</details> 
<details open>
<summary>[GET] /user/me/favorites</summary>
<p>
Retornar a lista de palavras marcadas como favoritas
</p>

```json
{
    "results": [
        {
            "word": "fire",
            "added": "2022-05-05T19:30:23.928Z"
        },
        {
            "word": "firefly",
            "added": "2022-05-05T19:30:24.088Z"
        },
        {
            "word": "fireplace",
            "added": "2022-05-05T19:30:28.963Z"
        },
        {
            "word": "fireman",
            "added": "2022-05-05T19:30:33.121Z"
        }
    ],
    "totalDocs": 20,
    "page": 2,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": true
}
```

</details>

Além disso, os endpoints devem utilizar os seguintes códigos de status:
- 200: sucesso com body ou sem body
- 204: sucesso sem body
- 400: mensagem de erro em formato humanizado, ou seja, sem informações internas e códigos de erro:

```json
{
    "message": "Error message"
}
```

**Obrigatório 3** - Você deve criar um script para baixar a lista de palavras do repositório e importar estas palavras para o banco de dados. A Free Dictionary API não possui endpoint com a lista de palavras. Para criar este endpoint será necessário alimentar o seu banco de dados com o [arquivo existente dentro do projeto no Github](https://github.com/meetDeveloper/freeDictionaryAPI/tree/master/meta/wordList).

**Diferencial 1** - Descrever a documentação da API utilizando o conceito de Open API 3.0;

**Diferencial 2** - Escrever Unit Tests para os endpoints da API;

**Diferencial 3** - Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;

**Diferencial 4** - Deploy em algum servidor, com ou sem automatização do CI.

**Diferencial 5** - Implementar paginação com cursores ao inves de usar page e limit . Ao realizar este diferencial, o retorno dos endpoints deve possuir a seguinte estrutura:

```json
{
    "results": [
        "fire",
        "firefly",
        "fireplace",
        "fireman"
    ],
    "totalDocs": 20,
    "previous": "eyIkb2lkIjoiNTgwZmQxNmjJkOGI5In0",
    "next": "eyIkb2lkIjoiNTgwZmQxNm1NjJkOGI4In0",
    "hasNext": true,
    "hasPrev": true,
}
```

**Diferencial 6** - Salvar em cache o resultado das requisições ao Free Dictionary API, para agilizar a resposta em caso de buscas com parâmetros repetidos. Sugestões são usar o Redis e/ou MongoDB;

O cache pode ser feito a guardar todo o corpo das respostas ou para guardar o resultado das queries do banco. Para identificar a presença de cache, será necessário adicionar os seguintes headers nas respostas:
- x-cache: valores HIT (retornou dados em cache) ou MISS (precisou buscar no banco)
- x-response-time: duração da requisição em milissegundos

### Front-End:

Nessa etapa você deverá desenvolver uma aplicação web para consumir a API que você criou.

**Obrigatório 1** - Você deverá atender aos seguintes casos de uso:

- Como usuário, devo ser capaz de realizar login com usuário e senha
- Como usuário, devo ser capaz de visualizar uma lista de palavras com rolagem infinita
- Como usuário, devo ser capaz de visualizar uma palavra, significados e a fonética
- Como usuário, devo ser capaz de salvar a palavra como favorito
- Como usuário, devo ser capaz de remover a palavra como favorito
- Como usuário, devo ser capaz de visitar uma lista com as palavras que já vi anteriormente

**Obrigatório 2** - Seguir o wireframe para a página de listagem dos dados.

<img src="./img/wireframe.png" width="100%" />

**Diferencial 1** - Escrever Unit Tests ou E2E Test. Escolher a melhor abordagem e biblioteca;

**Diferencial 2** - Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;

**Diferencial 3** - Colocar na URL os parametros utilizados na busca, para que seja possível compartilhar a URL;

**Diferencial 4** - Implementar SSR no projeto;

**Diferencial 5** - Implementar o projeto com PWA.

## Readme do Repositório

- Deve conter o título do projeto
- Uma descrição sobre o projeto em frase
- Deve conter uma lista com linguagem, framework e/ou tecnologias usadas
- Como instalar e usar o projeto (instruções)
- Não esqueça o [.gitignore](https://www.toptal.com/developers/gitignore)
- Se está usando github pessoal, referencie que é um challenge by coodesh:  

>  This is a challenge by [Coodesh](https://coodesh.com/)

## Suporte

Use a [nossa comunidade](https://discord.gg/rdXbEvjsWu) para tirar dúvidas sobre o processo ou envie uma mensagem diretamente a um especialista no chat da plataforma. 
