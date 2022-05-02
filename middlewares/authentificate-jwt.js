const { decodeJwt, generateJwt } = require("../utils/jwt-utils");
/**
 *
 * @param {adminRight: boolean} options
 * @returns {(req: Request, res: Response, next: NextFunction) => Void}
 */
const authentificateJwt = (options = { adminRight: false }) => {
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  return async (req, res, next) => {
    // header à recuperé
    const headerAuth = req.headers["autorization"];
    // console.log(req.headers); à cheacker le contenue de ce log
    // recup du jwt
    const token = headerAuth && headerAuth.split("")[1]; /// ??????
    // TODO supprimer console
    console.log(headerAuth, token);
    // Dans le cas ou il n'y aurait pas de token
    if (!token) {
      return res.sendStatus(401);
    }
    // Recup des données du Jwt
    let tokenData;
    try {
      tokenData = await decodeJwt(token);
    } catch (error) {
      return res.sendStatus(403);
    }
    // Verifier le droit d'utilisation
    if (options.adminRight) {
      const admin = await db.Members.findOne({
        where: {
          [Op.and]: [{ id: tokenData.id }, { isAdmin: true }],
        },
      });
      // Code d'erreur si pas de droit d'utilisation
      if (!admin) {
        return res.sendStatus(403);
      }
    }

    // Ajouter des infos du token dans {request}
    req.user = tokenData;
    TODO; // faire un log ici????

    next();
  };
};

module.exports = {
  authentificateJwt,
};
