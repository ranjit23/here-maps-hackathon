const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load profile

const Transport = require("../../models/Transport");
const User = require("../../models/User");
const Customer = require("../../models/Customer");

router.get("/test", (req, res) => res.json({ msg: "transport works work" }));

//current user profile

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Transport.findOne({ user: req.user.id })
      .then(transport => {
        if (!transport) {
          errors.notransport = "There is no transport";
          return res.status(404).json(errors);
        }
        res.json(transport);
      })
      .catch(err => res.status(404).json(err));
  }
);

//create user transport
//post req

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const transportFields = {};
    transportFields.user = req.user.id;
    if (req.body.company_name)
      transportFields.company_name = req.body.company_name;
    if (req.body.company_contact)
      transportFields.company_contact = req.body.company_contact;
    if (req.body.no_of_vehicle)
      transportFields.no_of_vehicle = req.body.no_of_vehicle;
    if (req.body.volume_length)
      transportFields.volume_length = req.body.volume_length;
    if (req.body.volume_breadth)
      transportFields.volume_breadth = req.body.volume_breadth;
    if (req.body.volume_height)
      transportFields.volume_height = req.body.volume_height;
    if (req.body.departure_date)
      transportFields.departure_date = req.body.departure_date;
    if (req.body.departure_time)
      transportFields.departure_time = req.body.departure_time;
    if (req.body.route_a) transportFields.route_a = req.body.route_a;
    if (req.body.route_b) transportFields.route_b = req.body.route_b;
    if (req.body.vehicle_no) transportFields.vehicle_no = req.body.vehicle_no;

    Transport.findOne({ user: req.user.id }).then(transport => {
      if (transport) {
        //UPDATE
        Transport.findOneAndUpdate(
          { user: req.user.id },
          { $set: transportFields },
          { new: true }
        ).then(transport => res.json(transport));
      } else {
        //CREATE

        //CHECK IF HANDLE EXIST

        Transport.findOne({ company_name: transportFields.company_name }).then(
          transport => {
            if (transport) {
              errors.company_name = "The company name already exists";
              res.status(400).json(errors);
            }

            //SAVE PROFILE

            new Transport(transportFields)
              .save()
              .then(transport => res.json(transport));
          }
        );
      }
    });
  }
);

module.exports = router;
