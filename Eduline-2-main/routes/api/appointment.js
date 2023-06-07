require("dotenv").config();
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const authUser = require("../../middleware/authUser");

const User = require("../../models/User");
const Educator = require("../../models/Educator");
const Profile = require("../../models/Profile");

// @route   Post api/appointment/:educator_id
// @desc    Create a user appointment
// @access  Private
router.post(
  "/:educator_id",
  [
    authUser,
    [
      check("studentname", "Student name is required").not().isEmpty(),
      check("age", "Age is required").not().isEmpty(),
      check("description", "Description is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const educator = await Educator.findById(req.params.educator_id).select(
        "-password"
      );
      const profile = await Profile.findOne({
        educator: req.params.educator_id,
      });

      // Create booking id
      function appointmentGenerator() {
        this.length = 8;
        this.timestamp = +new Date();

        var _getRandomInt = function (min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        this.generate = function () {
          var ts = this.timestamp.toString();
          var parts = ts.split("").reverse();
          var id = "";

          for (var i = 0; i < this.length; ++i) {
            var index = _getRandomInt(0, parts.length - 1);
            id += parts[index];
          }

          return id;
        };
      }

      const create_id = new appointmentGenerator();
      const appointmentId = create_id.generate();

      const newStudent = {
        bookingId: appointmentId,
        studentname: req.body.studentname,
        status: req.body.status,
        age: req.body.age,
        date: req.body.date,
        description: req.body.description,
        avatar: user.avatar,
        name: user.name,
        user: req.user.id,
      };

      const newAppointment = {
        bookingId: appointmentId,
        studentname: req.body.studentname,
        status: req.body.status,
        age: req.body.age,
        date: req.body.date,
        description: req.body.description,
        avatar: educator.avatar,
        name: educator.name,
        educator: educator.id,
      };

      profile.students.unshift(newStudent);

      await profile.save();

      user.appointments.unshift(newAppointment);
      await user.save();

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
