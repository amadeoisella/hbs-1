const express = require("express");
const {
  readUrls,
  addUrl,
  deleteUrl,
  editUrlForm,
  editUrl,
  redirecting,
} = require("../controllers/homeController");
const validateUrl = require("../middlewares/urlValidate");
const router = express.Router();

router.get("/", readUrls);
router.post("/", validateUrl, addUrl);
router.get("/eliminar/:id", deleteUrl);
router.get("/editar/:id", editUrlForm);
router.post("/editar/:id", validateUrl, editUrl);
router.get("/:shortUrl", redirecting);

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
