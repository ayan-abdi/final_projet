const yup = require("yup");
// Appliquer le yup dans tous les element requis dans chacun des methodes de subject

const postsValidatorAdd = yup.object().shape({
  title: yup.string().max(50).required(),
  content: yup.string().max(2000).required(),
});
// const postValidatorUpdate = yup.object().shape({
//     title: yup.string().max(50).required(),
//     content: yup.string().max(2000).required(),

// });
module.exports = {
  postsValidatorAdd,
};
