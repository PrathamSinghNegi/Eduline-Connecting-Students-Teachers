require("dotenv").config();
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authEducator = require("../../middleware/authEducator");

const Educator = require("../../models/Educator");

// @route   GET api/authEducator
// @desc    Tests auth Educator route
// @access  Public
router.get("/", authEducator, async (req, res) => {
  try {
    const educator = await Educator.findById(req.educator.id).select(
      "-password"
    );
    res.json(educator);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   post api/authEducator
// @desc    Authenticate Educator and get Token
// @access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // If Educator exists
      let educator = await Educator.findOne({ email });

      if (!educator) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid cridentials" }] });
      }

      const isMatch = await bcrypt.compare(password, educator.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid cridentials" }] });
      }

      // Return jsonwebtoken

      const payload = {
        educator: {
          id: educator.id,
        },
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
