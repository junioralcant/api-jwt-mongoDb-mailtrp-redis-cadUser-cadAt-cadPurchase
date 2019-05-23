const Ad = require('../models/Ad');
const Purchase = require('../models/Purchase')    
const User = require('../models/User');
const PurchaseMail = require('../jobs/PurchaseMail');   
const Queue = require('../services/Queue');

class PurchaseController {
    async store (req, resp){
        const {ad, content} = req.body; // ad id da intenção de compra , content messagem do intereçado

        const  purchaseAd = await Ad.findById(ad).populate('author'); // encontra o anuncio que o usuario quer fazer uma intenção de compra, e traz com ele as informações do autor
        const user = await User.findById(req.userId);

        const purchase = await Purchase.create({ // salva os dados da compra no banco de dados
            content,
            ad,
            user: user._id
        })

        Queue.create(PurchaseMail.key, {
            ad: purchaseAd, // renomeia purchaseAd para ad
            user,
            content
        }).save(); // salva o job no nosso redis

        return resp.json(purchase);
    }
}

module.exports = new PurchaseController();