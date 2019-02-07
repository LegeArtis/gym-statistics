

const express = require('express');
const app = express();
const businessRoutes = express.Router();
const ObjectId = require('mongodb').ObjectID;

// Require Business model in our routes module
let User = require('../models/User');

// Defined store route
businessRoutes.route('/add').post(function (req, res) {
  console.log(req.body);
  let user = new User(req.body);
  user.save()
    .then(business => {
      res.status(200).json({'user': 'user in added successfully'});
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
      console.log(`${err}`);
    });
});

// Defined get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {
  User.find(function (err, users){
    if(err){
      console.log(err + ' get');
    }
    else {
      res.json(users);
    }
  });
});

businessRoutes.route('/findById/:id').get(function (req, res) {
  const objectId = new ObjectId(req.params.id);
  User.findById(objectId, function (err, users) {
      res.json(users);
  });
});

businessRoutes.route('/findByFId/:id').get(function (req, res) {
  User.findOne({"facebookId": req.params.id}, function (err, users) {
    res.json(users);
  });
});

// Defined edit route
businessRoutes.route('/edit/:id').post(function (req, res) {
  const objectId = new ObjectId(req.params.id);
  User.findById(objectId, function (err, user){
    if (!user) {
      console.log('Could not find doc');
    }
    user.userTraining = req.body.userTraining;
    user.save().then(user => {
      console.log('edit inside');
      res.json('Edit complete');
    })
      .catch(err => {
        res.status(400).send("unable to edit the database");
      });
  });
});

//  Defined update route
businessRoutes.route('/update/:id').post(function (req, res){
   const objectId = new ObjectId(req.params.id);
  User.findById(objectId, function(err, user) {
    if (!user) {
      console.log('Could not find doc');
    }
    else {
       user.userTraining = req.body.userTraining;
      user.save().then(user => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
    }
  });
});


// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
  Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = businessRoutes;
