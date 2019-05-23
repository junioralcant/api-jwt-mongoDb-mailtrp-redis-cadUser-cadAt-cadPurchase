const Mail = require('../services/Mail');

class PurchaseMail {

    get key(){ // chave única   
        return 'PurchaseMail';
    }

    async handle( job, done){ // evia o email. job contem varias informações sobre job. done 
        const { ad, user, content } = job.data; // ad id da intenção de compra , content messagem do interessado

        // envia o email
        await Mail.sendMail({
            from: '"Junior Marques" <junioralcant111@gmail.com>',
            to: ad.author.email, // para quem sera enviado o email
            subject: `Solicitação de Compra: ${ad.title}`,
            template: 'purchase',
            context: { user, content, ad} 
        });

        return done(); // para finalizar o job
    }
}

module.exports  = new PurchaseMail();