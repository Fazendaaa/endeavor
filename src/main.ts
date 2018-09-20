import { IncomingMessage } from 'http';
import { request } from 'https';
import { DocumentNode } from 'graphql';

export interface GraphQLData {
    query: string | DocumentNode;
    variables?: object;
}

export interface ErrorPosition {
    line: number;
    column: number;
}

export interface AnilistError {
    data: null;
    errors: {
        status: number;
        message: string;
        locations: Array<ErrorPosition>;
        validation: {
            id: Array<string>;
        },
        score: Array<string>;
    }
}

const handleResponse = (resolve: (data: object) => void, reject: (data: AnilistError) => void, response: IncomingMessage): void => {
    let chunk = '';
    const { statusCode } = response;

    response.setEncoding('utf8')
        .on('error', reject)
        .on('uncaughtException', reject)
        .on('data', (data: string) => chunk += data)
        .on('end', () => {
            const result = JSON.parse(chunk);

            (200 !== statusCode) ? reject(result) : resolve(result);
        });
};

export const fetchAnilist = (search: GraphQLData): Promise<object> => new Promise((resolve: (data: object) => void, reject: (data: Error | AnilistError) => void) => {
    const post = request({
        method: 'POST',
        rejectUnauthorized: false,
        hostname: 'graphql.anilist.co',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const curriedHandleResponse = ((response: IncomingMessage) => handleResponse(resolve, reject, response));

    post.write(JSON.stringify(search));
    post.on('error', () => reject(new Error('Request error')));
    post.on('response', curriedHandleResponse);
    post.end();
});

export default fetchAnilist;
