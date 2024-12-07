const CustomAPIError = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')
const dbConnect = require('../db/dbconfig')

const getAllGames = async (req, res) => {
  const category = req.query.category
  try {
    const db = await dbConnect;
    const categoryId = category? await db.request()
    .input('Category', category)
    .query(`SELECT * FROM Category WHERE Name = @Category`) : null
    const result = await db.request().query(`SELECT * FROM product ${categoryId?.recordset? `WHERE CategoryId = ${categoryId.recordset[0].CategoryId}`:''}`);
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