const { required } = require('@hapi/joi');
const router = require('express').Router();
const validation = require('../validation/UserValidation');
const UserModel = require('../Models/User');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');
const jwt = require('jsonwebtoken')


router.post('/login', async (req, res) => {

    //validating
    const { error } = validation.loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //validating if the user is present
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email doesnt exists');

    //valid password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('invalid password');

    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN);
    res.header('auth-token', token).status(200).send(user);
})

router.post("/register", async (req, res) => {

    //validating
    const { error } = validation.registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //validatiing if the user is present
    const emailUser = await UserModel.findOne({ email: req.body.email });
    if (emailUser) return res.status(400).send("email is already present");


    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    //create a model and submit
    const user = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    });
    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (err) {
        res.status(404).send(err);
    }

})


module.exports = router;
