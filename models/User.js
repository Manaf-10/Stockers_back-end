const { Schema } = require('mongoose')

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordDigest: { type: String, required: true },
    avatar: { typre: String }
    // ,posts: [PostSchema]
  },
  { timestamps: true }
)

module.exports = UserSchema
