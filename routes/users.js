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

router.get("/:id", getUser, (req, res) => {
    res.send(res.user);
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

router.patch("/:id", getUser, async (req,res) => {
    if (req.body.firstName != null) {
        res.user.firstName = req.body.firstName;
    }

    if (req.body.email != null) {
        res.user.email = req.body.email;
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)

    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete("/:id", getUser, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json( "User deleted");
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if(user == null) {
            return res.status(404).json({ message: "Cannot find user" });
        }
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }

    console.log(user);
    res.user = user;
    next();
}


module.exports = router;