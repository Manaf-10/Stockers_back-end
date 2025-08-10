API_KEY = process.env.ALPHA_VANTAGE_APLI_KEY;
const axios = require("axios");
const stocks = require("../stocklist.json");

const getStockData = async (req, res) => {
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.params.symbol}&apikey=${API_KEY}`
  );
  res.send(response.data);
};

const getStockList = async (req, res) => {
  res.send(stocks);
};

module.exports = {
  getStockData,
  getStockList,
};
