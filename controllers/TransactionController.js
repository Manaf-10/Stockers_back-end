const { Transaction } = require('../models')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const showTransation = async (req, res) => {
  try {
    const Transations = await Transaction.find({})
    res.send(Transations)
  } catch (error) {
    throw error
  }
}

const CreateTransaction = async (req, res) => {
  try {
    const transations = await Transaction.create({ ...req.body })
    res.send(transations)
  } catch (error) {
    throw error
  }
}

const CloseTransaction = async (req, res) => {
  try {
    const transations = await Transaction.create({ ...req.body })
    res.send(transations)
  } catch (error) {
    throw error
  }
}

module.exports = {
  showTransation,
  CreateTransaction,
  CloseTransaction
}
