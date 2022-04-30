const express = require('express')
const bodyParser = require("body-parser")
const personController = require("./../Controllers/PersonController")
const app = express()
const port = 3000

class API {

  registerRouters() {
    app.use("/person", personController)
  }

  initAPIS() {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    this.registerRouters();
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    });
  }
}

module.exports=API;