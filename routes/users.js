const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err){
        res.status(500).json({ message: err.message });
    }
})

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    try {
        if(user == null) {
            throw new Error("User not found")
        }
        res.send(user);
    } catch(err) {
        res.status(404).json({message: err.message})
    }
})

router.post("/", async (req, res) => {
    const user = new User({
        firstName:req.body.firstName,
        email: req.body.email
    })

    try{
        const newUser = await user.save()
        res.status(201).send(newUser);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
})

router.patch("/:id", async (req, res) => {
    const updates = {};

    if (req.body.firstName != null) {
        updates.firstName = req.body.firstName;
    }

    if (req.body.email != null) {
        updates.email = req.body.email;
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json( "User deleted");
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router;