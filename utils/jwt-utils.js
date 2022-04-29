// Jsonwebtoken(generé) & (verifié)
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const generateJwt = ({ id, pseudo, isAdmin }) => {
  // le necessaire pour generer un jwt sur insomnia
  return new Promise((resolve, reject) => {
    const data = { id, pseudo, isAdmin }; //<= firstParamObject(doc)
    const secret = process.env.JWT_SECRET; //<=privateKey (docs)
    const options = {
      algorithm: "HS512", // HS256 par default   <= options
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
      expiresIn: "12h",
    };

    jwt.sign(data, secret, options, (error, token) => {
      if (error) {
        return reject(error);
      }
      const expire = new Date(jwt.decode(token).exp * 1000).toISOString();
      resolve({ token, expire }); //<= le contenu affiché dans insomnia apres avoir sender
    });
  });
};

const decodeJwt = (token) => {
  if (!token) {
    return Promise.reject(new Error("Votre JWT est invalid"));
  }

  return new Promise((resolve, reject) => {
    const secret = process.env.JWT_SECRET;
    const optionVerify = {
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
    };
    jwt.verify(token, secret, optionVerify, (error, data) => {
      if (error) {
        return reject(error);
      }

      resolve({
        id: data.id,
        pseudo: data.pseudo,
        isAdmin: data.isAdmin,
      });
    });
  });
};
module.exports = {
  generateJwt,
  decodeJwt,
};
