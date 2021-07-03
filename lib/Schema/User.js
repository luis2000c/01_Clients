const joi = require("joi")

const User = joi.object({
    primer_nombre: joi.string().min(2).max(50).empty().required(),
    primer_apellido: joi.string().min(2).max(50).empty().required(),
    segundo_nombre: joi.string().min(2).max(50).empty().required(),
    segundo_apellido: joi.string().min(2).max(50).empty().required(),
  });

  const changePassword = joi.object({
    new_password: joi.string().min(6).empty().required(),
    repeat_password: joi.string().empty().required(),
  });

module.exports = {
    User, changePassword,
}