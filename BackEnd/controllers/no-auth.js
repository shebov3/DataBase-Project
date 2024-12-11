const CustomAPIError = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')
const dbConnect = require('../db/dbconfig')

const getAllGames = async (req, res) => {
  const query = req.query;
  let queryKeys = Object.keys(query).length > 0 ? Object.keys(query) : null;
  let queryValues = Object.values(query);

  try {
    const db = await dbConnect;

    if (queryKeys) {
      if (queryKeys.includes('CategoryId')) {
        const index = queryKeys.indexOf('CategoryId');
        let categoryId = await db.request()
          .input('Category', queryValues[index])
          .query(`SELECT CategoryId FROM Category WHERE Name = @Category`);
        categoryId = categoryId.recordset[0]?.CategoryId; 
        if (categoryId !== undefined) {
          queryKeys[index] = 'p.CategoryId'
          queryValues[index] = categoryId;
        }
      }

      if (queryKeys.includes('Name')) {
        const nameIndex = queryKeys.indexOf('Name');
        const result = await db.request()
          .input('Name', '%' + queryValues[nameIndex] + '%')
          .query(`SELECT * FROM product WHERE Name LIKE @Name`);
        res.status(StatusCodes.OK).json({ games: result.recordset });
        return;
      }

      if (queryKeys.includes('ORDER_BY')) {
        const orderByIndex = queryKeys.indexOf('ORDER_BY');
        const key = queryKeys[orderByIndex].split('_').join(' ');
        const value = queryValues[orderByIndex].split('_').join(' ');
        queryKeys[orderByIndex] = key;
        queryValues[orderByIndex] = value; 
      }

      const request = db.request();
      const result = await request
      .input('QueryValue', queryValues[0])
      .input('QueryValue2', queryValues[1])
      .input('QueryValue3', queryValues[2])
      .query(`
        SELECT p.ProductId, p.Name, p.Brand, p.Description, p.Rating, p.Price, p.StockQuantity, 
              c.Name AS CategoryName, p.Platform, p.ReleaseDate,
              STRING_AGG(i.Img, ',') AS Images
        FROM Product p
        LEFT JOIN Product_IMG i ON p.ProductId = i.ProductId
        LEFT JOIN Category c ON p.CategoryId = c.CategoryId
        ${queryKeys[0] !== 'ORDER BY' ? `WHERE ${queryKeys[0]} = @QueryValue` : ''}  
        ${queryKeys[1] && queryKeys[1] !== 'ORDER BY' ? `AND ${queryKeys[1]} = @QueryValue2` : ''} 
        ${queryKeys[2] && queryKeys[2] !== 'ORDER BY' ? `AND ${queryKeys[2]} = @QueryValue3` : ''} 
        GROUP BY p.ProductId, p.Name, p.Brand, p.Description, p.Rating, p.Price, p.StockQuantity, 
                p.CategoryId, p.Platform, p.ReleaseDate, c.Name
        ${queryKeys.includes('ORDER BY') ? `ORDER BY ${queryValues[queryKeys.indexOf('ORDER BY')]}` : ''} 
      `);

    

      res.status(StatusCodes.OK).json({ games: result.recordset });
    } else {
      const request = db.request();
      const result = await request.query(`
        SELECT p.ProductId, p.Name, p.Brand, p.Description, p.Rating, p.Price, p.StockQuantity, 
               c.Name AS CategoryName, p.Platform, p.ReleaseDate,
               STRING_AGG(i.Img, ',') AS Images
        FROM Product p
        LEFT JOIN Product_IMG i ON p.ProductId = i.ProductId
        LEFT JOIN Category c ON p.CategoryId = c.CategoryId
        GROUP BY p.ProductId, p.Name, p.Brand, p.Description, p.Rating, p.Price, p.StockQuantity, 
                 p.CategoryId, p.Platform, p.ReleaseDate, c.Name
      `);
      
      res.status(StatusCodes.OK).json({ games: result.recordset });
      
    }
  } catch (err) {
    console.error("Error querying the database: ", err);
    throw new CustomAPIError('Error querying the database', StatusCodes.BAD_REQUEST);
  }

}

const getGame = async(req, res)=>{
  const {id} = req.params
  try {
    const db = await dbConnect;
    const result = await db.request().query(`
      SELECT p.ProductId, p.Name, p.Brand, p.Description, p.Rating, p.Price, p.StockQuantity, 
             c.Name AS CategoryName, p.Platform, p.ReleaseDate,
             STRING_AGG(i.Img, ',') AS Images
      FROM Product p
      LEFT JOIN Product_IMG i ON p.ProductId = i.ProductId
      LEFT JOIN Category c ON p.CategoryId = c.CategoryId
      WHERE p.ProductId = ${id}
      GROUP BY p.ProductId, p.Name, p.Brand, p.Description, p.Rating, p.Price, p.StockQuantity, 
               p.CategoryId, p.Platform, p.ReleaseDate, c.Name
    `);
    
    res.status(StatusCodes.OK).json({ game: result.recordset });    
  } catch (err) {
    console.error("Error querying the database: ", err);
    throw new CustomAPIError('Error querying the database', StatusCodes.BAD_REQUEST)
  }
}


module.exports = {
  getAllGames,
  getGame
}