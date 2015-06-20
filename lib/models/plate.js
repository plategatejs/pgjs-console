var Schema = require('mongoose').Schema;

var schema = new Schema({
  value: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  }
});

module.exports = function (connection) {
  connection.model('Plate', schema);
};
