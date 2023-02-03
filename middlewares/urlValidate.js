const { URL } = require("url");

const validateUrl = (req, res, next) => {
  try {
    const { origin } = req.body;
    const urlFrontend = new URL(origin);
    if (urlFrontend.origin !== "null") {
      if (
        urlFrontend.protocol === "http:" ||
        urlFrontend.protocol === "https:"
      ) {
        return next();
      }
    }
    throw new Error("No valida");
  } catch (error) {
    return res.send("Url no valida");
  }
};

module.exports = validateUrl;
