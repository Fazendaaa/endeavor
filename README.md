# endeavor

<div align = "center">
    <br>
    <img src="./others/img/logo/logo.png" height=260>
    <br>
    <br>

[![Say Thanks!](https://img.shields.io/badge/Say%20Thanks-!-1EAEDB.svg?longCache=true&style=for-the-badge)](https://saythanks.io/to/Fazendaaa)

[![English README](https://img.shields.io/badge/Language-EN-blue.svg?longCache=true&style=for-the-badge)](./README.md)
[![Portuguese README](https://img.shields.io/badge/Linguagem-PT-green.svg?longCache=true&style=for-the-badge)](./docs/readme/README_PT.md)

[![Build Status](https://img.shields.io/travis/Fazendaaa/endeavor.svg?style=flat-square)](https://travis-ci.org/Fazendaaa/endeavor)
[![codecov](https://img.shields.io/codecov/c/github/Fazendaaa/endeavor.svg?style=flat-square)](https://codecov.io/gh/Fazendaaa/endeavor)
[![Codacy Badge](https://img.shields.io/codacy/grade/c07f1a46b4224191af8f94788013ed06/master.svg?style=flat-square)](https://www.codacy.com/app/Fazendaaa/endeavor?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Fazendaaa/endeavor&amp;utm_campaign=Badge_Grade)
[![npm](https://img.shields.io/npm/dt/endeavor.svg?style=flat-square)](https://www.npmjs.com/package/endeavor)
[![Dependencies](https://david-dm.org/Fazendaaa/endeavor.svg?style=flat-square)](https://codeclimate.com/github/Fazendaaa/endeavor/master/package.json)
[![Known Vulnerabilities](https://snyk.io/test/github/Fazendaaa/endeavor/badge.svg)](https://snyk.io/test/github/Fazendaaa/endeavor)
[![Maintainability](https://api.codeclimate.com/v1/badges/5e7e7b6ec27b217a2013/maintainability)](https://codeclimate.com/github/Fazendaaa/endeavor/maintainability)

</div>

## About

A [node.js](https://nodejs.org/en/) package written in [TypeScript](https://www.typescriptlang.org/)(TS) that consumes the [Anilist API V2](https://github.com/AniList/ApiV2-GraphQL-Docs), written to support [GraphQL](https://graphql.org/) queries.

This package was written as dependency to [Telegram](https://telegram.org/)'s [AnilistBot](https://fazendaaa.github.io/AnilistBot/).

# Installing it:

```bash
npm install --save endeavor
```

**note**: no need of installing _@types/endeavor_ or something like it, the declaration typings file is linked in the [package.json](./package.json).

# How to use it?

Just use it as the following:

__queryAnilist({ query, variables })__
* Expect:
    * [String] query: GraphQL query
    * [Object] variables?: if needed
* Returns a Promise:
    * [Object] then: requested data
    * [Object | Error] catch: description error on the query or a Node error of the request

## Examples

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

This will print the following:

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

You can also use it as an _async_ call encapsulating it as:

```js
const callAnilist = async () => {
    const result = await queryAnilist({ query, variables });

    console.log(result);
};
```

This way, **console.log** also prints the same as before.

A more "advanced" usage of this package can be found at [AnilistBot](https://github.com/Fazendaaa/AnilistBot), with a caveat of a [webpack](https://webpack.js.org/) due to [webpack-graphql-loader](https://github.com/samsarahq/graphql-loader).

# Code
Plain and simple TS with the [Microsoft](https://github.com/Microsoft/tslint-microsoft-contrib) linter standards.

## Testing it
Just run:

```bash
npm test
```

In case of running into a [Snyk](http://snyk.io/) warning or something like that, just read their [docs](https://github.com/snyk/snyk#cli) in how to solve it. If that is the case, jus run:

```bash
npm run jest
```

## Built with
No dependency required :)

# TODO
* Mutation support
* Write more examples

# Authors
* [Fazendaaa](https://github.com/Fazendaaa)

# Contributing
Talk to me through an issue.

# License
Like many Open-Source Software (OSS) the MIT license is used, more about it in [LICENSE](./LICENSE).
