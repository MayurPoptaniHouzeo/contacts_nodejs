var express = require('express');
const { body, validationResult } = require('express-validator')
const service = require('./../Services/PersonService')
var router = express.Router();


router.post(
  "/add", [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("name").isLength({
      min: 2,
      max: 15,
    }).withMessage("Name must be 2 to 15 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
  ],
  (req, res) => {
    if(req.body==null) {
      res.status(400).send("No body found");
    }
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    service.add(req.body, (error, data) => {
      if(error) {
        res.send(error);
      } else {
        res.status(201).send(String(data));
      }
    });
  }
);

module.exports = router