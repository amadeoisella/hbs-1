const Url = require("../models/Url");
const { nanoid } = require("nanoid");

const readUrls = async (req, res) => {
  try {
    const urls = await Url.find().lean();
    res.render("home", { urls: urls });
  } catch (error) {
    console.log(error);
    res.send("Fallo algo");
  }
};

const deleteUrl = async (req, res) => {
  const { id } = req.params;
  try {
    await Url.findByIdAndDelete(id);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send("Fallo algo");
  }
};

const addUrl = async (req, res) => {
  const { origin } = req.body;
  try {
    const url = new Url({ origin: origin, shortUrl: nanoid(7) });
    await url.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send("Error");
  }
};

const editUrlForm = async (req, res) => {
  const { id } = req.params;
  try {
    const url = await Url.findById(id).lean();
    res.render("home", { url });
  } catch (error) {
    console.log(error);
    res.send("Error algo fallo");
  }
};

const editUrl = async (req, res) => {
  const { id } = req.params;
  const { origin } = req.body;
  try {
    await Url.findByIdAndUpdate(id, { origin: origin });
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send("Error algo fallo");
  }
};

const redirecting = async (req, res) => {
  const { shortUrl } = req.params;
  try {
    const urlDb = await Url.findOne({ shortUrl: shortUrl });
    res.redirect(urlDb.origin);
  } catch (error) {}
};

module.exports = {
  readUrls,
  addUrl,
  deleteUrl,
  editUrlForm,
  editUrl,
  redirecting,
};
