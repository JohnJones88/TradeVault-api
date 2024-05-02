const express = require('express');
const Users = require('../db/users-models');
const validator = require('validator');
const router = express.Router();

router.post('/', async (req, res) => {

    try {

        if (!req.body.first_name) {
            res.status(400).send("FirstName must exist");
            return;
        }

        if (!req.body.last_name) {
            res.status(400).send("LastName must exist");
            return;
        }

        if (!req.body.user_name) {
            res.status(400).send("UserName must exist");
            return;
        }

        if (!req.body.email) {
            res.status(400).send("Email must exist");
            return;
        }

        if (!validator.isEmail(req.body.email)) {
            res.status(400).send("Email is not an valid email format");
            return;
        }

        if (!req.body.password) {
            res.status(400).send("Password must exist");
            return;
        }

        const usersToCreate = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            email: req.body.email,
            user_name: req.body.user_name,
            password: req.body.password,
        };

        const createdNewUser = await Users.create(usersToCreate);

        createdNewUser.password = undefined;

        res.status(201).send(createdNewUser);
    } catch (error) {

        console.log(error);
        res.status(500).send(`Internal Server Error ${error}`);
    }
})

module.exports = router;
