const PassportLocalStrategy = require('passport-local').Strategy
const User = require('../data/User')
const encryption = require('../utilities/encryption')

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const user = {
    username: username.trim(),
    password: password.trim(),
  }

  User
    .findOne({username: username})
    .then(oldUser => {
      if (!oldUser) {
        let salt = encryption.generateSalt()
        let hashedPassword = encryption.generateHashedPassword(salt, user.password)
        User
        .create({
          username: user.username,
          salt: salt,
          hashedPass: hashedPassword
        })
        .then((newUser) => {
          return done(null)
        })
        .catch(err => {
          console.log(err.message)
          return done('Failed to create user')
        })
      } else {
        return done('User already exists!')
      }
    })
})
