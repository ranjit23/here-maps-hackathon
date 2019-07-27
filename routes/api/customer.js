const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load profile

const Transport = require("../../models/Transport");
const User = require("../../models/User");
const Customer = require("../../models/Customer");

router.get("/test", (req, res) => res.json({ msg: "customer works " }));

//current user profile

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Customer.findOne({ user: req.user.id })
      .then(customer => {
        if (!customer) {
          errors.nocustomer = "There is no customer";
          return res.status(404).json(errors);
        }
        res.json(customer);
      })
      .catch(err => res.status(404).json(err));
  }
);

//create user customer
//post req

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const customerFields = {};
    customerFields.user = req.user.id;
    if (req.body.company_name)
      customerFields.company_name = req.body.company_name;
    if (req.body.company_contact)
      customerFields.company_contact = req.body.company_contact;
    if (req.body.no_of_vehicle)
      customerFields.no_of_vehicle = req.body.no_of_vehicle;
    if (req.body.volume_length)
      customerFields.volume_length = req.body.volume_length;
    if (req.body.volume_breadth)
      customerFields.volume_breadth = req.body.volume_breadth;
    if (req.body.volume_height)
      customerFields.volume_height = req.body.volume_height;
    if (req.body.departure_date)
      customerFields.departure_date = req.body.departure_date;
    if (req.body.departure_time)
      customerFields.departure_time = req.body.departure_time;
    if (req.body.route_a) customerFields.route_a = req.body.route_a;
    if (req.body.route_b) customerFields.route_b = req.body.route_b;
    if (req.body.vehicle_no) customerFields.vehicle_no = req.body.vehicle_no;

    Customer.findOne({ user: req.user.id }).then(customer => {
      if (customer) {
        //UPDATE
        Customer.findOneAndUpdate(
          { user: req.user.id },
          { $set: customerFields },
          { new: true }
        ).then(customer => res.json(customer));
      } else {
        //CREATE

        //CHECK IF HANDLE EXIST

        Customer.findOne({ company_name: customerFields.company_name }).then(
          customer => {
            if (customer) {
              errors.company_name = "The company name already exists";
              res.status(400).json(errors);
            }

            //SAVE PROFILE

            new Customer(customerFields)
              .save()
              .then(customer => res.json(customer));
          }
        );
      }
    });
  }
);

module.exports = router;
