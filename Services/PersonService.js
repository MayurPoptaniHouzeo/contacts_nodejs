const res = require("express/lib/response");

function add(data, callback) {
  var query = `insert into person values(NULL, '${data["name"] ?? ''}', '${data["email"] ?? ''}', NULL)`
  con.query(query, (error, data) => {
    if(error) {
      callback(error, error.ER_PARSE_ERROR);
    } else {
      callback(null, data.insertId);
    }
  });  
}

module.exports = {
  add,
}