const res = require("express/lib/response");

async function add(data) {
  var query = `insert into person values(NULL, '${data["name"] ?? ''}', '${data["email"] ?? ''}', NULL)`
  return new Promise((resolve, reject) => {
    con.query(query, (error, data) => {
      if(error) {
        reject({
          error: true,
          data: error.ER_PARSE_ERROR
        });
      } else {
        resolve({
          error: false, 
          data: data.insertId,
        });
      }
    });  
  });
}

module.exports = {
  add,
}