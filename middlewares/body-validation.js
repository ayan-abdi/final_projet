const { Request, Response, NextFunction } = require("express");
const { BaseSchema } = require("yup");
const { InvalidFieldErrorRes } = require("../schemas/error-schema");

/** Middleware pour  valider le body via yup
 * @param {BaseSchema} yupValidator
 * @param {number} errorCode
 *
 * @returns {(req: Request, res: Response, next: NextFunction) => void}
 */
const bodyValideted = (yupValidator, errorCode = 422) => {
  /**
   * Middleware pour valider les données du body avec Yup
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  return (req, res, next) => {
    yupValidator
      .noUnknown()
      .validate(req.body, { abortEarly: false })
      .then((data) => {
        //données validée par le yup (avec validData property)
        req.validData = data;

        next();
      })
      .catch((yupError) => {
        // object errors issue des données validés par le yup
        const errors = yupError.inner.reduce((acc, error) => {
          const { path, message } = error;
          if (!acc.hasOwnProperty(path)) {
            //Dans le cas où acc n'a pas de propriété path alors renvoie-moi le code suivant
            acc[path] = [message];
            // faire un log pour voir
          } else {
            acc[path].push(message);
          }
          return acc;
        }, {});
        // Envoi d'une reponse d'une reponse formatté
        res
          .status(errorCode)
          .json(new InvalidFieldErrorRes("Data invalid", errors, errorCode));
      });
  };
};

module.exports = bodyValideted;
