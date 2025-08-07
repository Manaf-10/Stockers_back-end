const { User } = require('../models')

const middleware = require('../middleware/authMiddleware')

const registerUser = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body

    let passwordDigest = await middleware.hashPassword(password)

    let existingUser = await User.findOne({ username })
    let existingEmail = await User.findOne({ email })
    if (existingUser) {
      return res
        .status(400)
        .send('A user with that user name has already been registered!')
    } else if (existingEmail) {
      return res
        .status(400)
        .send('A user with that user email has already been registered!')
    } else {
      const user = await User.create({
        username,
        email,
        passwordDigest,
        avatar
      })
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
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).send('A user with that user name isn`t registered')
    }
    let matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )
    if (matched) {
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = middleware.createToken(payload)
      return res.status(200).send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error' })
  } catch (error) {
    console.log(error)
    res.status(401).send({ status: 'Error' })
  }
}
