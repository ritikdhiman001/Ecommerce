const express = require("express");
const router = express.Router();
const userModel = require("../models/User");

// POST /adduser
router.post("/adduser", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const adduser = new userModel({ firstName, lastName, email, password });
        await adduser.save();
        res.send("User added successfully");
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("Failed to add user");
    }
});

// GET /allusers
router.get("/allusers", async (req, res) => {
    try {
        const users = await userModel.find();
        res.send(users);
    } catch (error) {
        res.status(500).send("Failed to fetch users");
    }
});

// POST /login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userData = await userModel.findOne({ email });
        if (!userData) {
            return res.status(401).send("User not Found");
        }
        if (userData.password === password) {
            return res.send("Login Successfully");
        }
        return res.status(401).send("Incorrect Password");
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
