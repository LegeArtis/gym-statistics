const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
  facebookId: {
    type: String
  },
  userName: {
    type: String
  },
  userTraining: {
    type: Array
  }
},{
    collection: 'Users'
});

module.exports = mongoose.model('User', User);
