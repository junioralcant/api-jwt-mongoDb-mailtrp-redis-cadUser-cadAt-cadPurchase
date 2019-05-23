const Ad = require('../models/Ad');

class AdController {

    async index(req, resp) {

        const filters = {};

        // filter price
        if(req.query.price_min || req.query.price_max){ 
            filters.price = {};

            if(req.query.price_min){
                filters.price.$gte = req.query.price_min; // $gte  maior q, $gte  é uma propriedade do mongoose
            }

            if(req.query.price_max){
                filters.price.$lte = req.query.price_max; // $gte  menor q
            }
        }

        // filter title
        if(req.query.title){
            filters.title = new RegExp(req.query.title, 'i'); // RegExp() para indentificar se a palavra estar em qualquer lugar do título. 'i' para transformar a palavra informada em case sentive
        }

        const ads = await Ad.paginate(filters, {
            page: req.query.page || 1, // numero da pagina inicial
            limit: 20, 
            populate: ['author'], // mostra qual o campo da tabela relacionada aparecerar no lugar do id
            sort: '-createdAd' // lista os registro pela data contrário 
        });

        return resp.json(ads);
    };

    async show(req, resp) {
        const ad = await Ad.findById(req.params.id);

        return resp.json(ad);
    };

    async store(req, resp) {
        const ad = await Ad.create({...req.body, author: req.userId}); //...req.body pega todos os dados inf na req. req.userId coloca o id do autor no campo authod, a var req.userId foi criada no middleware de auth linha 18 

        return resp.json(ad);
    };

    async update(req, resp) {
        const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true});

        return resp.json(ad);
    };

    async destroy(req, resp) {
        await Ad.findByIdAndDelete(req.params.id);

        return resp.send();
    };
}

module.exports = new AdController();