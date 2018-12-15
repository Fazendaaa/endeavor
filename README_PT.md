# endeavor

<div align = "center">
    <br>
    <img src="../../others/img/logo/logo.png" height=260>
    <br>
    <br>

[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg?longCache=true&style=for-the-badge)](https://saythanks.io/to/Fazendaaa)

[![English README](https://img.shields.io/badge/Language-EN-blue.svg?longCache=true&style=for-the-badge)](../../README.md)
[![Portuguese README](https://img.shields.io/badge/Linguagem-PT-green.svg?longCache=true&style=for-the-badge)](./README_PT.md)

[![Build Status](https://img.shields.io/travis/Fazendaaa/endeavor.svg?style=flat-square)](https://travis-ci.org/Fazendaaa/endeavor)
[![codecov](https://img.shields.io/codecov/c/github/Fazendaaa/endeavor.svg?style=flat-square)](https://codecov.io/gh/Fazendaaa/endeavor)
[![Codacy Badge](https://img.shields.io/codacy/grade/c07f1a46b4224191af8f94788013ed06/master.svg?style=flat-square)](https://www.codacy.com/app/Fazendaaa/endeavor?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Fazendaaa/endeavor&amp;utm_campaign=Badge_Grade)
[![npm](https://img.shields.io/npm/dt/endeavor.svg?style=flat-square)](https://www.npmjs.com/package/endeavor)
[![Dependencies](https://david-dm.org/Fazendaaa/endeavor.svg?style=flat-square)](https://codeclimate.com/github/Fazendaaa/endeavor/master/package.json)
[![Known Vulnerabilities](https://snyk.io/test/github/Fazendaaa/endeavor/badge.svg)](https://snyk.io/test/github/Fazendaaa/endeavor)
[![Maintainability](https://api.codeclimate.com/v1/badges/5e7e7b6ec27b217a2013/maintainability)](https://codeclimate.com/github/Fazendaaa/endeavor/maintainability)

</div>

## Sobre

Um pacote de [node.js](https://nodejs.org/en/) escrito em [TypeScript](https://www.typescriptlang.org/)(TS) que consome a [Anilist API V2](https://github.com/AniList/ApiV2-GraphQL-Docs), com suporte a [GraphQL](https://graphql.org/) queries.

Este pacote foi escrito como dependência do [AnilistBot](https://fazendaaa.github.io/AnilistBot/) para [Telegram](https://telegram.org/).

# Instalando:

```bash
npm install --save endeavor
```

**obs**: não há necessidade de instalar _@types/endeavor_ ou algo do tipo, o arquivo de declaração de tipos se encontra linkado no [package.json](../../package.json).

# Como utilizar?

Apenas faça o seguinte:

__queryAnilist({ query, variables })__
* Esperado:
    * [String] query: GraphQL query
    * [Object] variables?: caso necessário
* Retorna uma Promise:
    * [Object] then: dados requistados
    * [Object | Error] catch: descrição do erro da query ou o erro da requisição

## Exemplos

```js
const query = 'query ($id: Int) {\
    Media (id: $id, type: ANIME) {\
        id\
        title {\
            romaji\
            english\
            native\
        }\
    }\
}';
const variables = {
    id: 15125
};
const result = queryAnilist({ query, variables }).then(console.log);
```

Isto irá imprimir o seguinte:

```js
data: {
    Media: {
        id: 15125,
        title: {
            english: 'Teekyuu',
            native: 'てーきゅう',
            romaji: 'Teekyuu'
        }
    }
}
```

Você pode também ecapsular em uma chamada _async_:

```js
const callAnilist = async () => {
    const result = await queryAnilist({ query, variables });

    console.log(result);
};
```

Desta maneira, **console.log** imprimirá o mesmo resultado como anteriormente.

Uma maneira mais "avançada" de utilização deste pacote pode ser encontrada no [AnilistBot](https://github.com/Fazendaaa/AnilistBot), com o truqe de utilização do [webpack](https://webpack.js.org/) junto do [webpack-graphql-loader](https://github.com/samsarahq/graphql-loader).

# Código
Puro e simples TS com os padrões de linter da [Microsoft](https://github.com/Microsoft/tslint-microsoft-contrib).

## Testando
Apenas rode:

```bash
npm test
```

Caso ocorra algum erro do [Snyk](http://snyk.io/) ou algo do tipo, apenas leia a [documentação](https://github.com/snyk/snyk#cli) deles de como resolver isso. Caso este seja o problema, rode:

```bash
npm run jest
```

## Construído com
Nenhuma dependência :)

# A Fazer
* Suporte a _Mutation_
* Escrever mais exemplos

# Autores
* [Fazendaaa](https://github.com/Fazendaaa)

# Contribuindo
Converse comigo através de uma issue.

# Licensa
Como muitos projetos open source, a licensa MIT é utilizada. Leia mais sobre em [LICENSE](../../LICENSE).
