import { fetchData } from '../../src/main';

describe('fetchData testing.', () => {
    test('Fetching an example in the docs.', async () => {
        const query = 'query ($id: Int) { # Define which variables will be used in the query (id)\n\
            Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)\n\
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
                        english: "Teekyuu",
                        native: "てーきゅう",
                        romaji: "Teekyuu"
                    }
                }
            }
        };

        expect.assertions(1);

        expect(await fetchData({ query, variables })).toEqual(output);
    });

    test('Fetching wrong argument.', () => {
        const query = 'query ($id: Int) { # Define which variables will be used in the query (id)\n\
            Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)\n\
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
            id: 15125
        };

        expect(fetchData({ query, variables })).rejects.toThrow();
    });
});
