const { Transaction } = require('../models')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const showTransaction = async (req, res) => {
  try {
    const Transactions = await Transaction.find({owner: req.params.user_id})
    res.send(Transactions)
  } catch (error) {
    throw error
  }
}

const CreateTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.create({ ...req.body , owner: req.params.user_id })
    res.send(transactions)
  } catch (error) {
    throw error
  }
}

const CloseTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.findByIdAndUpdate(req.params.transaction_id ,req.body,{new: true})
    res.send(transactions)
  } catch (error) {
    throw error
  }
}

module.exports = {
  showTransaction,
  CreateTransaction,
  CloseTransaction
}
