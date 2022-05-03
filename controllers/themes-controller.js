const db = require('../models'); 
const { NotFoundErrorRes, ErrorRes } = require('../schemas/error-schema');
const {SuccesArrayRes,SuccessObjectRes } = require("../schemas/succes-schema");


const themesController = {
        // Actions principaux
        getAll: async (req, res) => {
          

          const { rows, count } = await db.Themes.findAndCountAll({
            order: [['name', 'ASC']], 
            offset: req.pagination.offset, 
            limit: req.pagination.limit,
          });
            res.json(new SuccesArrayRes(rows, count)); //  <= cette ligne de commande à quoi correspond elle???
        },
        getById: async (req, res) => {
            const id = parseInt(req.params.id);
    
            const themes = await db.Themes.findOne({
                where: { id: id }
            });
    
            if (!themes) {
                return res.status(404).json(new NotFoundErrorRes('Themes not found'));
            }
            res.json(new SuccessObjectRes(themes));
        },

        add: async (req, res) => {
            const data = req.validData;
    
            const themesAdd= await db.Themes.create(data);
            res.json(new SuccessObjectRes(themesAdd));
        },
    
        update: async (req, res) => {
            const id = parseInt(req.params.id);
            const data = req.validData;
    
            const resultUpdate = await db.Themes.update(data, {
                where: { id },   // Ecriture simplifié -> { id: id }
                returning: true
            });
    
            const nbRow = resultUpdate[0];
            if (nbRow !== 1) {
                return res.status(400).json(new ErrorRes('Themes not found Up'));
            }
    
            const updatedData = resultUpdate[1];
            res.status(200).json(new SuccessObjectRes(updatedData[0]));
        },
        delete: async (req, res) => {
            const id = parseInt(req.params.id);
    
            const nbRow = await db.Themes.destroy({
                where: { id }
            });
    
            if (nbRow !== 1) {
                return res.status(404).json(new NotFoundErrorRes('Themes not found D'));
            }
            res.sendStatus(204);
        }

}; 
module.exports = themesController; 