const server = require('./server');

server.listen(3001 || process.env.PORT); //process.env.PORT se alguma variavel anbiente chamada PORT for criada, o nosso servidor ira usala como porta. se não ele ira usar a porta padrão 3001