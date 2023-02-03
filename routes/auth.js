const express = require("express");
const {
  loginForm,
  loginUser,
  registerForm,
  registerUser,
  confirmCounter,
} = require("../controllers/authController");
const router = express.Router();

router.get("/login", loginForm);
router.post("/login", loginUser);
router.get("/register", registerForm);
router.post("/register", registerUser);
router.get("/confirm/:token", confirmCounter);

module.exports = router;
