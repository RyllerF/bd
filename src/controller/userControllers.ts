import { Request, Response } from 'http';

interface User {
    id: number;
    cpf: string;
    nome: string;
    data_Nascimento: string;
}

// Crie uma variável local para armazenar os usuários
let users: User[] = [
    {
        id: 1,
        cpf: '11122233344',
        nome: 'guilherme',
        data_Nascimento: '10-02-2001',
    },
    {
        id: 2,
        cpf: '22233344455',
        nome: 'bruna',
        data_Nascimento: '11-02-2001',
    },
    {
        id: 3,
        cpf: '33344455566',
        nome: 'matheus',
        data_Nascimento: '12-02-2001',
    }
];

const userControllers = {
    listUsers(request: Request, response: Response): void {
        const { order } = request.query;

        const sortedUsers = users.sort((a: User, b: User) => {
            if (order === 'desc') {
                return a.id < b.id ? 1 : -1;
            }
            return a.id > b.id ? 1 : -1;
        });

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(sortedUsers));
    },

    getUserbyId(request: Request, response: Response): void {
        const { id } = request.params;

        const user = users.find((user: User) => user.id === Number(id));

        if (!user) {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'User not found' }));
            return;
        }
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(user));
    },

    createUser(request: Request, response: Response): void {
        let body = '';

        request.on('data', (chunk) => {
            body += chunk;
        });

        request.on('end', () => {
            try {
                const { cpf, nome, data_Nascimento } = JSON.parse(body);
                const lastUserId = users[users.length - 1].id;
                const newUser: User = {
                    id: lastUserId + 1,
                    cpf,
                    nome,
                    data_Nascimento
                };
                users.push(newUser);
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(newUser));
            } catch (error) {
                console.error('Error parsing request body:', error);
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Invalid request body' }));
            }
        });
    },

    updateUser(request: Request, response: Response): void {
        let { id } = request.params;

        let body = '';

        request.on('data', (chunk) => {
            body += chunk;
        });

        request.on('end', () => {
            try {
                const { cpf, nome, data_Nascimento } = JSON.parse(body);
                id = Number(id);
                const userExists = users.find((user: User) => user.id === id);

                if (!userExists) {
                    response.writeHead(400, { 'Content-Type': 'application/json' });
                    response.end(JSON.stringify({ error: 'User not found' }));
                    return;
                }

                users = users.map((user: User) => {
                    if (user.id === id) {
                        return {
                            ...user,
                            cpf,
                            nome,
                            data_Nascimento
                        };
                    }
                    return user;
                });

                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ id, cpf, nome, data_Nascimento }));
            } catch (error) {
                console.error('Error parsing request body:', error);
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Invalid request body' }));
            }
        });
    },

    deleteUser(request: Request, response: Response): void {
        let { id } = request.params;
        id = Number(id);

        users = users.filter((user: User) => user.id !== id);

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ deleted: true }));
    }
};

export default userControllers;
