const { List } = require('../models')
require('dotenv').config()

const getListing = async (req, res) => {

  const list = await List.findById({})

}

