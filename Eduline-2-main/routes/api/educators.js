require('dotenv').config();
const express = require('express');
const router = express.Router();
const gravtar = require('gravatar');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Educator = require('../../models/Educator');

// @route   Post api/educators
// @desc    Register Educator
// @access  Public
router.post('/',
[
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password min 6 to 10 charcters').isLength({ min: 6 })
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
        // See if user exists
        let educator = await Educator.findOne({ email });

        if(educator) {
            return res.status(400).json({ errors: [{ msg: 'Educator already exists' }] });
        }

        // Get educators gravtar

        const avatar = gravtar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        educator = new Educator({ 
            name,
            email,
            avatar,
            password
        });

        // Encrypt password

        const salt = await bcrypt.genSalt(10);

        educator.password = await bcrypt.hash(password, salt);

        await educator.save();

        //Return jsonwebtoken

        const payload = {
            educator: {
                id: educator.id
            }
        }

        jwt.sign(payload, process.env.jwtSecret,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;