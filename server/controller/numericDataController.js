const asyncHandler = require("express-async-handler");
const NaturalGasPrice = require("../schema/numericData");

/**
 * Get all data
 * @param  {req} req
 * @param  {res} res
 * @return
 */
const GetNumericData = asyncHandler(async (req, res) => {
  const getData = await NaturalGasPrice.find({});
  res.json(getData);
  });

/**
 * Get one random data
 * @param  {req} req
 * @param  {res} res
 * @return
 */
const GetRandomNumeric = asyncHandler(async (req, res) => {
  const getData = await NaturalGasPrice.find({});
  const random = Math.floor(Math.random() * getData.length);
  const getRandom = await NaturalGasPrice.findOne().skip(random);
  res.json(getRandom);
  });

  module.exports = { GetNumericData, GetRandomNumeric };