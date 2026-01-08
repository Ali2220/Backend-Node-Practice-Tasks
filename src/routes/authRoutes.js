const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and Password are required" });
    }

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length must be 6 or greater than 6" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      age: age || null,
    });

    const token = jwt.sign({ id: newUser._id }, "shh");
    res.cookie("token", token);

    res.status(201).json({ message: "New User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error at register user" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password, both are required" });
    }

    const userExists = await userModel.findOne({ email });

    if(!userExists){
        return res.status(404).json({message: 'User not found'})
    }

    const checkPassword = await bcrypt.compare(password, userExists.password)

    if(!checkPassword){
        return res.status(401).json({message: 'Email or password is incorrect'})
    }

    const token = jwt.sign({id: userExists._id}, 'shh')
    res.cookie('token', token)

    res.status(200).json({message: userExists})

  } catch (error) {
    res.status(500).json({message: error})

  }
});

module.exports = router;
