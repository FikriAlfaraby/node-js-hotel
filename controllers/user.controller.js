const userModel = require("../models/index").user;

var bodyParser = require("body-parser");
var express = require("express");
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const Op = require(`sequelize`).Op;

exports.getAllUsers = async (request, response) => {
  let users = await userModel.findAll();
  return response.json({
    success: true,
    data: users,
    message: "All user have been loaded",
  });
};

exports.findUsers = async (request, response) => {
  let nama_user = request.body.nama_user;
  let role = request.body.role;
  console.log(nama_user);

  let users = await userModel.findAll({
    where: {
      [Op.or]: [
        { nama_user: { [Op.substring]: nama_user } },
        { role: { [Op.substring]: role } },
      ],
    },
  });

  return response.json({
    success: true,
    data: users,
    message: "All User have been loaded",
  });
};

exports.addUser = async (request, response) => {
  let newUser = {
    nama_user: request.body.nama_user,
    foto: request.body.foto,
    email: request.body.email,
    password: request.body.password,
    role: request.body.role,
  };

  userModel.create(newUser).then((result) => {
    return response
      .json({
        success: true,
        data: result,
        message: "User added successfully",
      })
      .catch((err) => {
        return response.json({
          success: false,
          message: err.message,
        });
      });
  });
};

exports.updateUser = (request, response) => {
  let dataUser = {
    nama_user: request.body.nama_user,
    foto: request.file.foto,
    email: request.body.email,
    password: request.body.password,
    role: request.body.role,
  };
  idUser = request.params.id;

  userModel.update(dataUser, { where: { id: idUser } }).then((result) => {
    return response
      .jason({
        success: true,
        data: result,
        message: "User updated successfully",
      })
      .catch((err) => {
        return response.jason({
          success: false,
          message: err.message,
        });
      });
  });
};

exports.deleteUser = (request, response) => {
  let idUser = request.params.id;

  userModel.destroy({ where: { id: idUser } }).then((result) => {
    return response
      .json({
        success: true,
        message: "User deleted successfully",
      })
      .catch((err) => {
        return response.json({
          success: false,
          message: err.message,
        });
      });
  });
};
