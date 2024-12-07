const CustomAPIError = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')
const dbConnect = require('../db/dbconfig')

const getAllGames = async (req, res) => {
  const query = req.query
  queryKeys = Object.keys(query).length > 0 ? Object.keys(query) : null
  console.log(queryKeys[0], Object.values(query)[0])
  try {
    const db = await dbConnect;
    if (queryKeys){
      if (queryKeys[0] == 'Category'){
        const categoryId = await db.request()
        .input('Category', Object.values(query)[0])
        .query(`SELECT * FROM Category WHERE Name = @Category`)
  
        const result = await db.request()
        .input('CategoryId', categoryId.recordset[0].CategoryId)
        .query(`SELECT * FROM product WHERE CategoryId = @CategoryId`);
  
        res.status(StatusCodes.OK).json({games: result.recordset});
      }
      else if (queryKeys[0] == 'Name'){  
        const result = await db.request()
        .input('Name', '%' + Object.values(query)[0] + '%')
        .query(`SELECT * FROM product WHERE Name LIKE @Name`);
        res.status(StatusCodes.OK).json({games: result.recordset});
      }else{
        const request = db.request()
        const result = await request
        .input('QueryValue', Object.values(query)[0])
        .query(`SELECT * FROM product WHERE ${queryKeys[0]} = @QueryValue`)

        res.status(StatusCodes.OK).json({games: result.recordset});
      }
    }else{
      const request = db.request()
      const result = await request.query(`SELECT * FROM product`)
      res.status(StatusCodes.OK).json({games: result.recordset});
    }


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