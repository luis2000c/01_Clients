var express = require('express');
var router = express.Router();
const { findPermiso, createPermiso, updatePermiso, deletePermiso } = require("../services/Permisos.service")
const {DataValidator} = require("../middlewares/DataValidator")
const {Permiso} = require("../lib/Schema/Permiso")

router
    .get('/', async (req, res) => {
        try {
            const {id} = req.query
            const permisos = await findPermiso(id)
            res.status(200).json({
                msg: "Path Permisos",
                body: permisos
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal Server Error",
            })
        }
    })
    .post('/', DataValidator("body",Permiso),async (req, res) => {
        try {
            const { body: { nombre } } = req
            const result = await createPermiso(nombre)
            res.status(200).json({
                msg: "Permiso Creado",
                body: result.ops,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal Server Error",
            })
        }
    })
    .put('/', DataValidator("body",Permiso), async (req, res) => {
        try {
            let { query: { id } } = req
            let { body: { nombre } } = req
            const result = await updatePermiso(id, nombre)
            res.status(200).json({
                msg: "permiso actualizado",
                body: result,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal Server Error",
            })
        }
    })
    .delete('/:id', async (req, res) => {
        try {
            const { params: { id } } = req
            const result = await deletePermiso(id)
            res.status(200).json({
              msg: "permiso eliminado",
              body: result,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                msg: "Internal Server Error",
            })
        }
    })

module.exports = router