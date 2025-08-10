const axios = require("axios");
API_KEY = process.env.ALPHA_VANTAGE_APLI_KEY;

const getStockData = async (req, res) => {
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.params.symbol}&apikey=${API_KEY}`
  );
  res.send(response.data);
};

module.exports = {
  getStockData,
};
