const { Schema } = require('mongoose')

const TransactionSchema = new Schema(
  {
    symbol: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['buy', 'sell']
    },
    actionPrice: { type: String, required: false },
    quantity: { type: String, required: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = TransactionSchema
