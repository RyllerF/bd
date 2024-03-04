import { IncomingMessage } from 'http';

function bodyParser(request: IncomingMessage, callback: () => void): void {
    let body = '';

    request.on('data', (chunk: Buffer) => {
        body += chunk.toString();
    });

    request.on('end', () => {
        try {
            body = JSON.parse(body);
            (request as any).body = body;
            callback();
        } catch (error) {
            console.error('Error parsing request body:', error);
            callback();
        }
    });
}

export default bodyParser;
