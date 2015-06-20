var Schema = require('mongoose').Schema;
var bcrypt = require('bcrypt');

var schema = new Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },

  password: {
    type: String,
    required: true
  }
});

schema.pre('save', function (next) {
  var _this = this;

  if (!_this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(function(err, salt) {
    if (!!err) {
      return next(err);
    }

    bcrypt.hash(_this.password, salt, function(err, hash) {
      if (!!err) {
        return next(err);
      }

      _this.password = hash;

      next();
    });
  });
});

module.exports = function (connection) {
  connection.model('User', schema);
};
