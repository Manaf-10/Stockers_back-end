const { List } = require('../models')
require('dotenv').config()

const getTrackedLists = async (req, res) => {
  try {
    const list = await List.findOne({
      type: 'tracked',
      owner: req.params.user_id
    })
    res.send(list.stocks)
  } catch (error) {
    console.log(error)
  }
}

const getOwnedLists = async (req, res) => {
  try {
    const list = await List.findOne({
      type: 'owned',
      owner: req.params.user_id
    })
    res.send(list.stocks)
  } catch (error) {
    console.log(error)
  }
}

const addToOwnedList = async (req, res) => {
  try {
    const list = await List.findOneAndUpdate(
      {
        type: 'owned',
        owner: req.params.user_id
      },
      {
        $push: {
          stocks: {
            symbol: req.body.symbol,
            price: req.body.price,
            company: req.body.company,
            amount: req.body.amount
          }
        }
      },
      { upsert: true }
    )

    res.send({ msg: 'added' })
  } catch (error) {
    console.log(error)
  }
}

const addToTrackedList = async (req, res) => {
  try {
    const list = await List.findOneAndUpdate(
      {
        type: 'tracked',
        owner: req.params.user_id
      },
      {
        $push: {
          stocks: {
            symbol: req.body.symbol,
            price: req.body.price,
            company: req.body.company,
            amount: req.body.amount
          }
        }
      },
      {
        new: true,
        upsert: true
      }
    )

    // res.send(list.stocks[list.stocks.length - 1])
    res.send({ msg: 'added' })
  } catch (error) {
    console.log(error)
  }
}

const deleteTracked = async (req, res) => {
  try {
    await List.updateOne(
      { type: 'tracked', owner: req.params.user_id },
      { $pull: { stocks: { symbol: req.body.symbol } } }
    )

    res.send({ msg: `removed ${req.body.symbol} from tracked` })
  } catch (error) {
    console.log(error)
  }
}

const deleteOwned = async (req, res) => {
  try {
    await List.updateOne(
      { type: 'owned', owner: req.params.user_id },
      { $pull: { stocks: { symbol: req.body.symbol } } }
    )

    res.send({ msg: `removed ${req.body.symbol} from owned` })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getTrackedLists,
  getOwnedLists,
  addToOwnedList,
  addToTrackedList,
  deleteTracked,
  deleteOwned
}
