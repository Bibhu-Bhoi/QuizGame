const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { title: "Home Page" });
});

router.get("/about", (req, res) => {
    res.render("about", { title: "About Us" });
});

router.get("/contact", (req, res) => {
    res.render("contact", { title: "Contact Us" });
});

router.get("/quiz", (req, res) => {
    const topic = req.query.topic || "general";
    res.render("quiz", { title: "Quiz", topic });
});

module.exports = router;
