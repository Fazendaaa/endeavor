import { queryAnilist } from '../../src/index';

jest.setTimeout(10000);

describe('queryAnilist testing.', () => {
    test('Fetching an example in the docs.', async () => {
        const query = 'query ($id: Int) {\n\
            Media (id: $id, type: ANIME) {\n\
                id\n\
                title {\n\
                    romaji\n\
                    english\n\
                    native\n\
                }\n\
            }\n\
        }';
        const variables = {
            id: 15125
        };
        const output = {
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
        };

        return expect(queryAnilist({ query, variables })).resolves.toEqual(output);
    });

    test('Fetching wrong argument.', async () => {
        const query = 'query ($id: Int) {\n\
            Media (id: $id, type: ANIME) {\n\
                id\n\
                title {\n\
                    romaji\n\
                    native\n\
                    english\n\
                    portuguese\n\
                }\n\
            }\n\
        }';
        const variables = {
            id: -1
        };
        const output = {
            data: null,
            errors: [
                {
                    locations: [
                        {
                            line: 8,
                            column: 21
                        }
                    ],
                    message: 'Cannot query field \"portuguese\" on type \"MediaTitle\".',
                    status: 400
                }
            ]
        };

        return expect(queryAnilist({ query, variables })).rejects.toEqual(output);
    });

    test('Fetching missing argument.', async () => {
        const query = 'query ($id: Int) {\n\
            Media (id: $id, type: ANIME) {\n\
                id\n\
                title {\n\
                    romaji\n\
                    native\n\
                    english\n\
                }\n\
            }\n\
        }';
        const variables = {};
        const output = {
            data: {
                Media: {
                    id: 1,
                    title: {
                        romaji: 'Cowboy Bebop',
                        native: 'カウボーイビバップ',
                        english: 'Cowboy Bebop'
                    }
                }
            }
        };

        return expect(queryAnilist({ query, variables })).resolves.toEqual(output);
    });
});
