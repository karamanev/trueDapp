const jwt = require('jsonwebtoken')
const User = require('../data/User')
const PassportLocalStrategy = require('passport-local').Strategy

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  const user = {
    username: username.trim(),
    password: password.trim()
  }

  User
    .findOne({username: username})
    .then(targetUser => {
      if (!targetUser) {
        const error = new Error('Incorrect credentials')
        error.name = 'IncorrectCredentialsError'

        return done(error)
      }
      if (!targetUser.authenticate(user.password)) {
        const error = new Error('Incorrect credentials')
        error.name = 'IncorrectCredentialsError'

        return done(error)
      }
      const payload = {
        sub: targetUser.id
      }

      // create a token string
      const token = jwt.sign(payload, 's0m3 r4nd0m str1ng')
      const data = {
        username: targetUser.username,
        isAdmin: targetUser.roles.indexOf('Admin') >= 0
      }

      return done(null, token, data)
    })
})
