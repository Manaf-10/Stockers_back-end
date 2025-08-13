const { User, List } = require('../models')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const middleware = require('../middleware/authMiddleware')

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const avatar = req.file ? req.file.filename : 'default_avatar.jpg'
    let passwordDigest = await middleware.hashPassword(password)
    let existingUser = await User.findOne({ username: username })
    let existingEmail = await User.findOne({ email: email })

    if (existingUser) {
      return res.send({ msg: 'Username already taken' })
    } else if (existingEmail) {
      return res.send({ msg: 'Email already taken' })
    } else {
      const user = await User.create({
        username,
        email,
        passwordDigest,
        avatar
      })
      const owndList = await List.create({ type: 'owned', owner: user._id })
      const TrkdList = await List.create({ type: 'tracked', owner: user._id })
      res.status(200).send(user)
    }
    res.status(401).send({ status: 'Error' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error' })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.send({ msg: "user doesn't exist" })
    }
    let matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )
    if (matched) {
      let payload = {
        id: user.id,
        email: user.email,
        avatar: user.avatar,
        username: user.username
      }

      // let token = middleware.createToken(payload)
      let token = jwt.sign(payload, process.env.APP_SECRET)

      // console.log(token)

      return res.status(200).send({ user: payload, token: token })
    } else {
      return res.send({ msg: 'Wrong password' })
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error' })
  }
}

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    let user = await User.findById(req.params.user_id)
    let matched = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.user_id, {
        passwordDigest
      })
      let payload = {
        id: user.id,
        email: user.email
      }
      return res.send({ msg: 'Password Updated!', user: payload })
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error' })
  }
}

const CheckSession = async (req, res) => {
  try {
    const { payload } = res.locals
    res.status(200).send(payload)
  } catch (error) {
    console.log(error)
  }
}

const updateProfile = async (req, res) => {
  try {
    // console.log(res.locals)
    let response
    const { username, email } = req.body
    if (res.locals.payload.id === req.params.user_id) {
      if (req.file) {
        let avatar = req.file.filename
        response = {
          username,
          email,
          avatar
        }
      } else {
        response = {
          username,
          email
        }
      }
      //only updtes if user id matches parameter
      const user = await User.findByIdAndUpdate(req.params.user_id, response, {
        new: true
      })
      res.send(user)
    } else {
      return res.send({ msg: 'unauthoriezed' })
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error' })
  }
}

const viewProfile = async (req, res) => {
  try {
    if (res.locals.payload.id === req.params.user_id) {
      const user = await User.findById(req.params.user_id)
      res.send(user)
    }
    res.status(401).send({ status: 'Error' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error' })
  }
}

module.exports = {
  registerUser,
  login,
  updatePassword,
  CheckSession,
  updateProfile,
  viewProfile
}
