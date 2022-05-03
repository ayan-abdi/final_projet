const yup = require("yup");
// Appliquer le yup dans tous les element requis dans chacun des methodes de subject

const postsValidatorAdd = yup.object().shape({
  title: yup.string().required().max(50),
  content: yup.string().required().max(2000),
  // createdOn: yup.date().default(() => new Date()),
  // liaison avec la table many-to-many
  themes: yup.array(yup.number()).default([]), //<= ? Dans la db c'est l'id du themes qui va etre enregistrer
});
const postsValidatorUpdate = yup.object().shape({
  title: yup.string().required().max(50),
  content: yup.string().required().max(2000),
});
// Table: ForeinKey
const postsCatValidator = yup.object().shape({
  themes: yup.array(yup.number()).default([]),
});
module.exports = {
  postsValidatorAdd,
  postsValidatorUpdate,
  postsCatValidator,
};
