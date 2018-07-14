const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const localSignupStrategy = require('./passport/local-signup')
const localLoginStrategy = require('./passport/local-login')
const authRoutes = require('./routes/auth')

let env = process.env.NODE_ENV || 'development'
let settings = require('./config/settings')[env]

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())

app.use(cors())
require('./config/database')(settings)

passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)

app.use('/auth', authRoutes)

app.listen(settings.port, () => {
  console.log(`Server running on port ${settings.port}...`)
})
