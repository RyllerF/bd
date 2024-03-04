interface User {
    id: number;
    cpf: number;
    nome: string;
    data_Nascimento: string;
}

const users: User[] = [
    {
        id: 1,
        cpf: 11122233344,
        nome: 'guilherme',
        data_Nascimento: '10-02-2001',
    },
    {
        id: 2,
        cpf: 22233344455,
        nome: 'bruna',
        data_Nascimento: '11-02-2001',
    },
    {
        id: 3,
        cpf: 33344455566,
        nome: 'matheus',
        data_Nascimento: '12-02-2001',
    }
];

export default users;
