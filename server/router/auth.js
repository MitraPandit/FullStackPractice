const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

// const cookieParser = require("cookie-parser");
// router.use(cookieParser());

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', function (req, res) {
    res.send("Hello world from the server!")
})

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill the fields correctly!" });
    }

    try {
        const UserExists = await User.findOne({ email: email });

        if (UserExists) {
            return res.status(422).json({ error: "Email already exists" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Passwords don't match" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });

            await user.save();

            res.status(201).json({ message: "User registered successfully" });
        }


    } catch (err) {
        console.log(err);
    }

})


router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please fill all required fields" });
        }

        const userLogin = await User.findOne({ email: email });
        console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);

            // console.log(req.cookies);
            res.cookie('jwtoken', token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            // console.log(req.cookies);

            if (!isMatch) {
                res.status(400).json({ error: "Invalid credentials" });
            } else {
                res.json({ message: "User signed-in successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid credentials" });
        }

    } catch (err) {
        console.log(err);
    }
});


router.get('/about', authenticate, function (req, res) {
    console.log("About Page GET");
    res.send(req.rootUser);
})

router.get('/getdata', authenticate, function (req, res) {
    res.send(req.rootUser);
})

router.get('/logout', function (req, res) {
    console.log("Logout Page");
    res.clearCookie('jwtoken', { path: '/' })
    res.status(200).send('User logged out');
})


module.exports = router;














// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;
//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({ error: "Please fill the fields correctly!" });
//     }

//     User.findOne({ email: email }).then((UserExists) => {
//         if (UserExists) {
//             return res.status(422).json({ error: "Email already exists" });
//         }

//         const user = new User({ name, email, phone, work, password, cpassword });

//         user.save().then(() => {
//             res.status(201).json({ message: "User registered successfully" });
//         }).catch((err) => res.status(500).json({ error: "Failed to register" }));
//     }).catch(err => { console.log(err); });

//     // res.json({ message: req.body });
// })