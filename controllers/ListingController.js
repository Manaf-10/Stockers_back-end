const { List } = require('../models')
require('dotenv').config()

const getTrackedLists = async (req, res) => {
  try {
    const list = await List.findById({ type: 'tracked', owner: req.payload })
    return list
  } catch (error) {
    console.log(error)
  }
}

const getOwnedLists = async (req, res) => {
  try {
    const list = await List.findById({ type: 'owned', owner: req.payload })
    return list
  } catch (error) {
    console.log(error)
  }
}

const addToOwnedList = async (req, res) => {
  try {
    const list = await List.findById({
      type: 'owned',
      owner: req.params.user_id
    })
    list.stocks.push(req.body)
    res.send(list.stocks)
  } catch (error) {
    console.log(err4)
  }
}

const addToTrackedList = async (req, res) => {
  try {
    const list = await List.findById({
      type: 'tracked',
      owner: req.params.user_id
    })
    list.stocks.push(req.body)
    res.send(list.stocks)
  } catch (error) {
    console.log(err4)
  }
}


