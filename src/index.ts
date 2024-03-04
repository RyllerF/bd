import * as mysql from 'mysql';

// Configurações de conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'seu_banco_de_dados'
});

// Método para inserir uma linha em uma tabela
function inserirLinha(nome: string, idade: number): void {
  const query = `INSERT INTO tabela_exemplo (nome, idade) VALUES ('${nome}', ${idade})`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Erro ao inserir linha:', error);
      return;
    }
    console.log('Linha inserida com sucesso!');
  });
}

// Método para consultar uma tabela
function consultarTabela(tabela: string): void {
  const query = `SELECT * FROM ${tabela}`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Erro ao consultar tabela:', error);
      return;
    }
    console.log('Resultados da consulta:');
    console.log(results);
  });
}

// Conectar ao banco de dados
connection.connect((error) => {
  if (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    return;
  }
  console.log('Conexão ao banco de dados estabelecida com sucesso!');

  // Exemplo de inserção de linha
  inserirLinha('João', 30);

  // Exemplo de consulta de tabela
  consultarTabela('tabela_exemplo');
});
