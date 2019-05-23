require('dotenv').config(); // para dar acesso as variaveis ambientes configuradas no arquivo .env

const express = require('express');
const mongoose = require('mongoose');
const Youch = require('youch'); // é ultilizado apenas no ambiente de desenvolvimento. formata a msg de erro para ficar mais legível
const Sentry = require('@sentry/node');
const sentryConfig = require('./config/sentry');
const validate = require('express-validation');
const databaseConfig = require('./config/database');


class App {
    constructor(){
        this.express = express();
        this.isDev = process.env.NODE_ENV != 'production';  // verifica se o usrário esta no ambiente de desnvolvimento
        
        this.sentry();
        this.database();
        this.middleware();
        this.routes();
        this.exception();
    }

    sentry(){ // para trabalhar com tratamentos de erros no ambiente de produção
        Sentry.init(sentryConfig);
    }

    database(){
        mongoose.connect(databaseConfig.uri, {
            useCreateIndex: true,
            useNewUrlParser: true
        });
    }

    middleware(){
        this.express.use(express.json()); // para poder trabalhar com formulários
        this.express.use(Sentry.Handlers.requestHandler());// isse tem que ser feito para sentry funcionar  
    }

    routes(){
        this.express.use(require('./routes'));
    }

    exception(){ // metodo para lidar com as exeptions da aplicação

        if(process.env.NODE_ENV == 'production'){ //  se o ambiente for ambiente de produção
            this.express.use(Sentry.Handlers.errorHandler()); // tem que colocar depois da rotas
        }

        this.express.use(async (err, req, resp, next) =>{
           
            if(err instanceof validate.ValidationError){ // verifica se o erro é uma instancia do validate. 
                return resp.status(err.status).json(err); 
            }

            if(process.env.NODE_ENV != 'production'){ // para visualizar os erros  mais detalhados quando aplicação não estiver no anbiente de produção
                const youch  = new Youch(err, req); 

                return resp.json(await youch.toJSON());
            }

            return resp.status(err.status || 500).json({ error: 'Internal Server Error' }); // se ouver algum erro com status irar retonar o satus do erro, se não, retorna um erro 500
        });
    }
}

module.exports = new App().express;