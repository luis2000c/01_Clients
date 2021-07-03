const joi = require("joi")

const insertRol = joi.object({
    nombre: joi.string().min(2).max(50).empty().required(),
    permisos : joi.string().empty(),
});

const UpdateRol = joi.object({
    nombre: joi.string().min(2).max(50).empty().required(),
    permisos: joi.string().empty(),
});

module.exports = {
    insertRol, UpdateRol
}