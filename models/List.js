const { Schema } = require('mongoose')

const ListSchema = new Schema({
  type: { type: String, enum: ['tracked', 'owned'] },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  stocks: [
    {
      symbol: { type: String },
      price: { type: Number },
      company: { type: String },
      amount: { type: Number }
    }
  ]
})

module.exports = ListSchema
