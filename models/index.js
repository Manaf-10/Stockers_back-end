const mongoose = require('mongoose')
const userSchema = require('./User')
const PostSchema = require('./post')
const TransactionSchema = require('./Transaction')

const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', PostSchema)
const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = {
  User,
  Post,
  Transaction
}
