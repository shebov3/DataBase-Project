const CustomAPIError = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')
const dbConnect = require('../db/dbconfig')

const getAllGames = async (req, res) => {
  try {
    const db = await dbConnect;
    const result = await db.request().query("SELECT * FROM product");
    res.status(StatusCodes.OK).json({games: result.recordset});
  } catch (err) {
    console.error("Error querying the database: ", err);
    throw new CustomAPIError('Error querying the database', StatusCodes.BAD_REQUEST)
  }
}

const getGame = async(req, res)=>{
  const {id} = req.params
  try {
    const db = await dbConnect;
    const result = await db.request().query(`SELECT * FROM product where ProductId = ${id}`);
    res.status(StatusCodes.OK).json({game: result.recordset});
  } catch (err) {
    console.error("Error querying the database: ", err);
    throw new CustomAPIError('Error querying the database', StatusCodes.BAD_REQUEST)
  }
}


module.exports = {
  getAllGames,
  getGame
}