class ServerResponse {
  constructor(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  } 

  toJson() {
    return JSON.stringify(this);
  }
}

module.exports = ServerResponse