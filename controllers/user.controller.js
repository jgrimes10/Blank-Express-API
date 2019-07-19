const User = require('../models/user.model');
const debug = require('../helpers/debugger');

exports.test = function(req, res) {
  res.send('Greetings from the test controller');
};

exports.get_user = function(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (!user) {
      return res.sendStatus(404);
    }

    return res.status(200).send(user);
  });
}

exports.get_users = function(req, res) {
  User.find({}, (err, users) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (!users) {
      return res.sendStatus(404);
    }

    return res.status(200).send(users);
  });
}

exports.create_user = function(req, res) {
  const newUser = new User(req.body);

  newUser.save(err => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.status(201).send(newUser);
  });
}

exports.update_user = function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (!user) {
      return res.sendStatus(404);
    }

    res.status(200).send(user);
  })
};

exports.delete_user = function(req, res) {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (!user) {
      return res.sendStatus(404);
    }

    return res.status(200).send(user);
  });
}