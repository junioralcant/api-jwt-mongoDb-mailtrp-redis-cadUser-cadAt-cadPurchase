const Purchase = require('../models/Purchase');

class ApproveController {

    async update (req, resp) {
        const { id } = req.params;

        const { ad } = await Purchase.findById(id).populate({
            path: 'ad',
            populate: {
                path: 'author'
            }
        });

        if (!ad.author._id.equals(req.userId)) { // se o user não for o autor
            return resp.status(401).json({ error: "You're not the ad author" })
          }

        if (ad.purchasedBy) {
            return resp
                .status(400)
                .json({ error: 'This ad had already been purchased' })
        }
        
        
        ad.purchasedBy = id

        await ad.save()

        return resp.json(ad)  
      
    }
}

module.exports = new ApproveController();