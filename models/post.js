const { Schema } = require('mongoose')

const PostSchema = new Schema(
  {
    description: { type: String, required: true },
    img: { type: String, required: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
    // ,posts: [PostSchema]
  },
  { timestamps: true }
)

module.exports = PostSchema
