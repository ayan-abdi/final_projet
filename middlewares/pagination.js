const { Request, Response, NextFunction } = require("express");

const defaultOptions = {
  defaultLimit: 10,
  maxLimit: 40,
};
/**
 * Les significations des valeurs de pagination
 * @param {{defaultLimit: number?, maxLimit: number?}}options
 * @returns {(req: Request, res: Response, next: NextFunction) => Void}
 */

const pagination = (options) => {
  // Association et destructuring de 2 element: defaultOptions et options
  const { defaultLimit, maxLimit } = { ...defaultOptions, ...options };
  /**
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   */
  return (req, res, next) => {
    const userOffset = parseInt(req.query.offset); //localhost:8000/api/auth/register?limit=10 =>  query= ?limit=10
    const userlimit = parseInt(req.query.limit); //POURQUOI PARSER?????

    const offset = !isNaN(userOffset) && userOffset > 0 ? userOffset : 0; //Si userOffset est different de isNAN et plus grand que 0 dc affiche moi userOffset sinnon affiche 0
    const limit =
      !isNaN(userlimit) && userlimit >= 0
        ? Math.min(userlimit, maxLimit)
        : defaultLimit; // Math.min = affiche moi la plus petite limite entre (userLimit et maxlimit)

    req.pagination = { offset, limit };
    // log de req.pagination
    next();
  };
};
module.exports = pagination;
