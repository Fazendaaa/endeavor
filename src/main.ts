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

const handleResponse = (resolve: (data: object) => void, reject: (data: Error) => void, response: IncomingMessage): void => {
    let chunk = '';
    const { statusCode } = response;

    if (200 !== statusCode) {
        reject(new Error('Error: status 200'));
    }

    response
        .setEncoding('utf8')
        .on('error', reject)
        .on('uncaughtException', reject)
        .on('data', (data: string) => chunk += data)
        .on('end', () => resolve(JSON.parse(chunk)));
};

export const fetchData = (search: GraphQLData): Promise<object | Error> => new Promise((resolve: (data: object) => void, reject: (data: Error) => void) => {
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

    post.on('error', reject);
    post.on('response', curriedHandleResponse);
    post.write(JSON.stringify(search));
    post.end();
});
