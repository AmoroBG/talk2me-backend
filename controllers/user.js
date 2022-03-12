// REQUIRE PACKAGES
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// REQUIRE MODULES - INTERNAL
const { find } = require("../models/user");
const User = require("../models/user");
const { json } = require("express/lib/response");

// LOAD CONFIG
dotenv.config({ path: "../server/config/config.env" });
//Register User - /users/user/register - POST
exports.registerUser = function (req, res) {
  // check if email already exist
  User.find({ email: req.body.email })
    .exec()
    .then(function (user) {
      if (user.length >= 1) {
        res.status(409).json({
          message: "This email address is already registered!",
        });
      } else {
        // hash password
        bcrypt.hash(req.body.password, 12, function (err, hash) {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            // create user

            const user = new User({
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              phone: req.body.phone,
              email: req.body.email,
              password: hash,
            
            });

            user
              .save()
              .then(function () {
                res.status(200).json({
                  message: "Registration successful",
                });
              })
              .catch(function (err) {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};
//Get all Users
exports.getUsers=function(req, res){
  User.find().then(function(foundUsers){
    res.status(200).json({
      foundUsers
    })
  }).catch(function(err){
    res.status(500).json({
      Error:err
    })
  })
}
// Get one User
exports.getUser=function(req, res){
User.findById(req.params.userId).then(function(foundUser){
  res.status(200).json(foundUser)
}).catch(function(err){
  res.status(500).json({
    Error:err
  })
})
}
// Delete all users - DELETE - "/"
exports.deleteUsers = function (req, res) {
  User.remove()
    .then(function () {
      res.status(200).json({
        message: "All users successfuly deleted",
      });
    })
    .catch(function (err) {
      res.status(500).json({
        error: err,
      });
    });
};
// Delete one user - DELETE - "/:userId"
exports.deleteUser = function (req, res) {
  User.findByIdAndRemove(req.params.userId)
    .then(function () {
      res.status(200).json({
        message: "User deleted",
      });
    })
    .catch(function (err) {
      res.status(500).json({
        error: err,
      });
    });
};
// Update all records of a user - PUT - "/:userId"
exports.updateUserRecords = function (req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
    },
    { new: true }
  )
    .then(function () {
      res.status(201).json({
        message: "User records updated",
      });
    })
    .catch(function (err) {
      res.status(500).json({
        error: err,
      });
    });
};
// Update a specific record of a user - PATCH - "/:userId"
exports.updateSomeUserRecords = function (req, res) {
  User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body })
    .then(function () {
      res.status(201).json({
        message: "User record updated",
      });
    })
    .catch(function (err) {
      res.status(500).json({
        error: err,
      });
    });
};
// User Login - POST - "/login"
exports.userLogin = function (req, res) {
  User.find({ email: req.body.email })
    .exec()
    .then(function (user) {
      if (user.length < 1) {
          return res.status(401).json({
          message: "Auth Failed!",
        });
      }
      bcrypt.compare(
        req.body.password,
        user[0].password,
        function (err, result) {
          if (err) {
            return res.status(401).json({
              message: "Auth Failed!",
            });
          }
          if (result) {
            // The user to login here
            const token = jwt.sign(
              { email: user[0].email, userId: user[0]._id },
              process.env.JWT_KEY,
              { expiresIn: "1h" }
            );
            return res.status(200).json({
              message: "Auth Successful",
              token: token,
              userId: user[0]._id.toString(),
            });
          }
          return res.status(401).json({
            message: "Auth Failed!",
          });
        }
      );
    })
    .catch(function (err) {
      res.status(500).json({
        error: err,
      });
    });
};

// User Logout - GET - "/logout"
exports.userLogout = function (req, res) {
  res.cookie("jwt", " ", { maxAge: 1 });
  res.json({
    message: "Logout",
  });
};

// exports.userLogout=function(req,res){
//   req.logout();
//   res.json({
//     message: "Logged out"
//   })
// };