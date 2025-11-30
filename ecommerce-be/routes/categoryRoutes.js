const express = require("express")
const router = express.Router();
const Category = require("../models/Category.js");


router.post("/addcategory", async (req, res) => {
    const { name } = req.body;
    try {
        const addCategory = new Category({ name })
        await addCategory.save();
        res.send("Category Add Successfully")
    }
    catch (error) {
        console.error("Error Saved Category", error)
        res.status(500).send("Failed to add Category")
    }
});
router.get("/allcategory", async (req, res) => {
    try {
        const Categorys = await Category.find();
        res.send(Categorys)
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).send("Failed to fetch categories");
    }
})
module.exports = router;