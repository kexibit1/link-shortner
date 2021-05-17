const router = require("express").Router();
const Link = require("../models/Link");
const auth = require("../middleware/auth.middleware");
const shortid = require("shortid");

router.post("/generate", auth, async (req, res) => {
  try {
    const baseURL = "http://localhost:5000";
    const { from } = req.body;

    const code = shortid.generate();

    const exist = await Link.findOne({ from });

    if (exist) {
      return res.json({ link: exist });
    }

    const to = baseURL + "/t/" + code;

    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();
    res.status(201).json({ link });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please tty again" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please tty again" });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id); // ??????
    res.json(link);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong. Please tty again" });
  }
});

module.exports = router;
