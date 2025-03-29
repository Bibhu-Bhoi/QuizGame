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

router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
    res.render("register", { title: "Register" });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    // Add authentication logic here
    if (username === "admin" && password === "password") {
        res.redirect("/");
    } else {
        res.render("login", { title: "Login", error: "Invalid credentials" });
    }
});

router.post("/register", (req, res) => {
    const { username, password } = req.body;
    // Add user registration logic here
    res.redirect("/login");
});

module.exports = router;