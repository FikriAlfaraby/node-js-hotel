const express = require("express");

const app = express();

app.use(express.json());

const userController = require("../controllers/user.controller");

app.get("/", userController.getAllUsers);

app.post("/", userController.addUser);

app.post("/find", userController.findUsers);

app.put("/:id", userController.updateUser);

app.delete("/:id", userController.deleteUser);

module.exports = app;
