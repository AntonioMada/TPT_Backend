var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../configurations/config");
let User = require("../model/user");
var DuplicatedRowException = require("../Exceptions/DuplicatedRowException");
var UserNotFoundException = require("../Exceptions/UserNotFoundException");
const user = require("../model/user");

async function inscription(req, res) {
  let email = req.body.email;
  let name = req.body.name;
  let username = req.body.username;
  let address = req.body.address;
  let birthday = req.body.birthday;
  let password = req.body.password;
  let isAdmin = req.body.isAdmin;

  try {
    var hashedPassword = bcrypt.hashSync(password);
    //check for duplicate users
    let duplicatedUser = await User.findOne({
      username: req.body.username,
    });
    if (duplicatedUser) {
      throw new DuplicatedRowException("Cet utilisateur existe déjà");
    }
    const user = await User.create({
      email: email,
      name: name,
      username: username,
      address: address,
      birthday: birthday,
      password: hashedPassword,
      isAdmin,
    });

    var token = generateToken(user);
    res.status(200).send({ auth: true, token });
  } catch (e) {
    console.log(e);
    if (e instanceof DuplicatedRowException) {
      res.status(500).send(e.message);
      return;
    }
    res.status(500).send();
  }
}

var generateToken = function (user) {
  var token = jwt.sign({ id: user._id }, config.secret, {
    expiresIn: config.duration,
  });
  return token;
};

async function login(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  try {
    console.log("login()");
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new UserNotFoundException("Cet utilisteur n'existe pas");
    }
    var isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new UserNotFoundException("Le mot de passe est incorrecte");
    }
    var token = generateToken(user);
    res.status(200).send({ auth: true, token: token });
  } catch (e) {
    console.log(e);
    if (e instanceof UserNotFoundException) {
      res.status(404).send("Username ou mot de passe incorrecte");
      return;
    }
    res.status(500).send("Un problème est survenu au niveau du serveur");
  }
}

async function getMe(req, res) {
  console.log("getMe()");
  let username = req.body.username;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new UserNotFoundException("Cet utilisteur n'existe pas");
    }
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send("Un problème est survenu lors de la recherche de l'utilisateur");
  }
}

module.exports = {
  inscription,
  generateToken,
  login,
  getMe,
};
