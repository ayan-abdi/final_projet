const db = require("../models");
const { NotFoundErrorRes, ErrorRes } = require("../schemas/error-schema");
const {
  SuccesArrayRes,
  SuccessObjectRes,
} = require("../schemas/succes-schema");

const postsController = {
  // Actions principaux
  getAll: async (req, res) => {
    const { offset, limit } = req.pagination; 
    // const text = "coucou la voiture";
    // const splitText = text.split("u");
    // console.log(splitText);
    // Ajout de pagination avec offset et limit
    const { rows, count } = await db.Posts.findAndCountAll({
      distinct: true,
      offset,
      limit, 

      // include: db.Categories           // Many to Many avec toutes les infos (donc la table intermediaire)
      include: [
        {
          model: db.Themes,
          through: { attributes: [] },
        } 
      ],
    });
    res.json(new SuccesArrayRes(rows, count)); //  <= injecter ici un schema de reponse
  },
  getOne: async (req, res) => {

    const id = parseInt(req.params.id);
    
    const Posts = await db.Posts.findByPk(id, {
      include:  [{
        model: db.Themes, 
        through:  { attributes: [] } // <=pkoi un array vide???? 
      }]
    });
    if(!Posts) {
      return res.status(404).json(new NotFoundErrorRes('Aucun post trouvé'));
    }
    res.json(new SuccessObjectRes(Posts));
  },
  add: async (req, res) => {
    // Recuperation des données à ajouter dans la DB

    const data = req.validData;
    //  Recuperation des données lié au login
    data.isAdmin = req.user.id;

    // Ajouter des transaction pour securiser les op DB
    const transaction = await db.sequelize.transaction();

    try {
      // Ajout d'un element subject
      const postsAdded = await db.Posts.create(data, { transaction });

      // Ajout d'un element categories via l'id(if existed id)
      await postsAdded.addThemes(data.Themes, { transaction });

      await transaction.commit();

      res.json(new SuccessObjectRes(postsAdded)); // <=> Si on met pas le status d
    } catch (error) {
      // Retour à l'etat initial
      await transaction.rollback();

      throw error;
    }
  },

  update: async (req, res) => {
    const id = parseInt(req.params.id);
    const isAdmin= req.user.id;
    const data = req.validData;
    const transaction = await db.sequelize.transaction();

    const [nbRow, updatedData ] = await db.Posts.update(data, {
      where: {
        [Op.and]: [
          { id },  // <= id de l'element en question
          { isAdmin }   //<= id du member qui a l'abilité de updater le contenu
        ]
      }, 
      returning: true, 
      transaction
    });
    if (nbRow !== 1) {
      await transaction.rollback();
      return res.status(400).json(new ErrorRes('Row Update uncorrect'));
    }
    await transaction.commit(); 
    res.json(SuccessObjectRes(updatedData))
  },
  
  delete: async (req, res) => {
    const id = parseInt(req.params.id); 
    const isAdmin = req.user.id; 

    const target = await db.Posts.findByPk(id);
    if(!target) {
      return res.status(404).json(new NotFoundErrorRes('Bad post found to delete'))
    }
    if(target.isAdmin !== isAdmin) {
      return res.status(403).json(new NotFoundErrorRes('vous n etes pas admin pour deleter'))
    }
    const transaction = await db.sequelize.transaction();
    await target.destroy({transaction}); 

    res.sendStatus(204);
  },

  addThemes: async (req, res) => {
    const id = parseInt(req.params.id); 
    const isAdmin = req.user.id; 
    const data = req.validData; 

    const posts = await db.Posts.findByPk(id, {
        include: {
          model: db.Themes, 
          through: { attributes: [] }
        }
    }); 
    if(!posts) {
      return res.status(404).json(new NotFoundErrorRes('Themes not found'));
    }
    if(posts.isAdmin !== isAdmin) {
      return res.status(403).json(new NotFoundErrorRes('Only Admin can create themes'));
    }
    // Dans le cas ou le theme existe déjà
    const themeDuplon = posts.Themes.map(t => t.id).find(id => data.Themes.includes(id));

    if(themeDuplon) {
      return res.status(400).json(new ErrorRes('Le theme existe déjà !'))
    }
    await posts.addThemes(data.Themes); 
    // Recup des données 
    const postsAfter = await db.Posts.findByPk(id, {
      include: [{
        model: db.Themes, 
        through:{  attributes: [] }
      }]
    });
    res.json(new SuccessObjectRes(postsAfter));
  },
  removeThemes: async(req, res) => {

    const id = parseInt(req.params.id); 
    const data = req.validData; 
    const isAdmin = req.user.id; 

    const posts = await db.Posts.findByPk(id); 

    if(!posts) {
      return res.status(404).json(new NotFoundErrorRes('Posts not found for remove a theme'));
    }
    if(posts.isAdmin !== isAdmin) {
      return res.status(403).json(new NotFoundErrorRes('Vous n\avez pas d\ accès pour retirer un thème '))
    }
    await posts.removeThemes(data.Themes)  //<= j'attend de retirer dans mon post le theme en question qui se trouve  à l'interieur de mes themes dans mes data.

    res.json(new SuccessObjectRes(posts)); 
  }
};

module.exports = postsController;

 // verification du memberid === admin TODO