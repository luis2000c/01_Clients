var express = require('express');
var router = express.Router();
const { findUsers, updateUser, deleteUser, change_password } = require("../services/Clients.service")
const { createUser } = require("../services/Clients.service")
const { DataValidator } = require("../middlewares/DataValidator")
const { User, changePassword } = require("../lib/Schema/User")

/* GET users listing. */
router
  .get("/", async (req, res) => {
    try {
      const users = await findUsers();
      res.status(200).json({
        msg: "Path Users",
        body: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }
  })
  .get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const users = await findUsers(id);
      res.status(200).json({
        msg: "Path Users",
        body: users,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }
  })
  .post("/", DataValidator("body", User), async (req, res) => {
    try {

      const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido } = req.body;

      const result = await createUser(primer_nombre, segundo_nombre, primer_apellido, segundo_apellido);

      res.status(200).json({
        msg: "Usuario Creado",
        body: result.ops,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }
  })
  .put("/", DataValidator("body", User), async (req, res) => {
    try {

      const { query: { id } } = req;
      const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido } = req.body;
      const result = await updateUser(id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido);
      const userUpdated = await findUsers(id);

      res.status(200).json({
        msg: "Usuario Actualizado",
        body: userUpdated,
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }
  })
  .put("/change-password/:id", DataValidator("body", changePassword), async (req, res) => {

    try {
      const { params: { id } } = req;
      const { new_password, repeat_password } = req.body;
      const change_pass = await change_password(id, new_password, repeat_password);
      const passwordUpdated = await findUsers(id);

      if (change_pass.msg == "error") {
        res.status(200).json({
          msg: "Las contraseñas son diferentes (Verifique que coincidaan)",
        });
      }
      else {

        res.status(200).json({
          msg: "Contraseña Actualizada Cor",
          body: passwordUpdated,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal Server error",
      });
    }

  })
  .delete("/:id", async (req, res) => {
    try {
      const { params: { id } } = req
      const result = await deleteUser(id)
      res.status(200).json({
        msg: "usuario eliminado",
        body: result,
      });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
      })
    }
  })

module.exports = router;
