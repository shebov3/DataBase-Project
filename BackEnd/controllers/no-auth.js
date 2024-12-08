const CustomAPIError = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')
const dbConnect = require('../db/dbconfig')

const getAllGames = async (req, res) => {
  const query = req.query
  queryKeys = Object.keys(query).length > 0 ? Object.keys(query) : null
  queryValues = Object.values(query)
  try {
    const db = await dbConnect;
    if (queryKeys){
      if (queryKeys.includes('CategoryId')){
        let categoryId = await db.request()
        .input('Category', queryValues[queryKeys.indexOf('CategoryId')])
        .query(`SELECT CategoryId FROM Category WHERE Name = @Category`)
        categoryId = categoryId.recordset[0].CategoryId
        queryValues[queryKeys.indexOf('CategoryId')] = categoryId
      }
      else if (queryKeys.includes('Name')){  
        const result = await db.request()
        .input('Name', '%' + queryValues[0] + '%')
        .query(`SELECT * FROM product WHERE Name LIKE @Name`);
        res.status(StatusCodes.OK).json({games: result.recordset});
        return
      }
      if (queryKeys.includes('ORDER_BY')){
        key = [queryKeys[queryKeys.indexOf('ORDER_BY')].split('_').join(' '), queryValues[queryKeys.indexOf('ORDER_BY')].split('_').join(' ')]
        queryKeys.splice(queryKeys.indexOf('ORDER_BY'), 1, key[0])
        queryValues.splice(queryKeys.indexOf('ORDER_BY'), 1, key[1])
      }
      const request = db.request()
      const result = await request
      .input('QueryValue', queryValues[0])
      .input('QueryValue2', queryValues[1])
      .input('QueryValue3', queryValues[2])
      .query(`
        SELECT * 
        FROM product
        ${queryKeys[0] !== 'ORDER BY' ? `WHERE ${queryKeys[0]} = @QueryValue` : ''}  
        ${queryKeys[1] && queryKeys[1] !== 'ORDER BY' ? `AND ${queryKeys[1]} = @QueryValue2` : ''}
        ${queryKeys[2] && queryKeys[2] !== 'ORDER BY' ? `AND ${queryKeys[2]} = @QueryValue3` : ''}
        ${queryKeys.includes('ORDER BY') ? `ORDER BY ${queryValues[queryKeys.indexOf('ORDER BY')]}` : ''}
      `);
    
    
    


      res.status(StatusCodes.OK).json({games: result.recordset});
      
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