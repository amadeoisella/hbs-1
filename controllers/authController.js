const User = require("../models/User");
const { nanoid } = require("nanoid");

const loginForm = (req, res) => {
  res.render("login");
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("No existe este email");

    if (!user.confirmCounter) throw new Error("Falta confirmar cuenta");

    if (!(await user.comparePassword(password)))
      throw new Error("Password invalida");

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send(error.message);
  }
};

const registerForm = (req, res) => {
  res.render("register");
};

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) throw new Error("Ya existe el usuario");

    user = new User({ userName, email, password, tokenConfirm: nanoid() });
    await user.save();

    //enviar correo electronico con la cuenta de confirmacion

    res.redirect("/auth/login");
  } catch (error) {
    res.json({ error: error.message });
  }
};

const confirmCounter = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ tokenConfirm: token });
    if (!user) throw new Error("No existe este usuario");

    user.confirmCounter = true;
    user.tokenConfirm = null;

    await user.save();

    res.redirect("/auth/login");
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  loginForm,
  loginUser,
  registerForm,
  registerUser,
  confirmCounter,
};
