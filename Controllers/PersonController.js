var express = require('express');
const { body, validationResult } = require('express-validator')
const service = require('./../Services/PersonService')
var router = express.Router();
var ServerResponse = require("../models/ServerResponse");


router.post(
  "/add", [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("name").isLength({
      min: 2,
      max: 15,
    }).withMessage("Name must be 2 to 15 characters long"),
    body("email").isEmail().withMessage("Invalid email"),
  ],
  async (req, res) => {
    var serverResponse = new ServerResponse(200, "", {});
    if(Object.keys(req.body).length === 0) {
      serverResponse.statusCode = 400;
      serverResponse.message = "No Body Found";
    } else {
      const errors = validationResult(req);
      if(!errors.isEmpty()) {
        serverResponse.statusCode = 400;
        serverResponse.message = errors.array();
      } else {

        var data = await service.add(req.body);
        if(data.error) {
          serverResponse.statusCode = 500;
          serverResponse.message = data.data;
        } else {
          serverResponse.statusCode = 201;
          serverResponse.message = "Record added successfully";
          serverResponse.data = {
            insertId: data.data,
          };
        }
      }
    }
    res.status(serverResponse.statusCode).json(serverResponse);
  }
);

module.exports = router