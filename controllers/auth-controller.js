const db = require("../models");
const bcrypt = require("bcrypt");
const { generateJwt } = require("../utils/jwt-utils");
const { ErrorRes } = require("../schemas/error-schema");
const { Op } = require("sequelize");

const authController = {
  register: async (req, res) => {
    // Recup des données
    const { pseudo, email } = req.validData;
    //log ici

    //  Hashage du pwd via bcrypt
    const password = await bcrypt.hash(req.validData.password, 10);

    //  Creer un compte avec le minimum requis
    const member = await db.Members.create({
      pseudo,
      email,
      password,
      // isAdmin: true,
    });
    // console.log("Register", member);

    // Ajout d'un JWT + condition pour generer un token
    const token = await generateJwt({
      id: member.id,
      pseudo: member.pseudo,
      isAdmin: member.isAdmin,
    });

    // Envoi du token
    res.json(token);
  },

  login: async (req, res) => {
    const { identity, password } = req.validData;

    const member = await db.Members.findOne({
      where: {
        // Dans le cas ou pour recuperer son login l'identity correspond soit au pseudo ou password
        [Op.or]: [
          {
            pseudo: identity,
          },
          {
            email: { [Op.eq]: identity.toLowerCase() },
          },
        ],
      },
    });
    //  Dans le cas le member y est pas
    if (!member) {
      return res
        .status(422)
        .json(new ErrorRes("Nous trouvons pas vos données", 422));
    }
    //  Member exist donc verification du pwd via bcrypt
    const isValid = await bcrypt.compare(password, member.password);

    //  Dans le cas ou le pwd n'est pas hashé comme il faut
    if (!isValid) {
      return res.status(422).json(new ErrorRes("Votre pwd est invalid", 422));
    }

    //  Generation d'un jwt
    const token = await generateJwt({
      id: member.id,
      pseudo: member.pseudo,
      isAdmin: member.isAdmin,
    });
    res.json(token);
  },
};
module.exports = authController;
