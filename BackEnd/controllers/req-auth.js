const CustomAPIError = require('../errors/custom-error')
const { StatusCodes } = require('http-status-codes')
const dbConnect = require('../db/dbconfig')
const sql = require('mssql');
// const multer = require('multer');

// const storage = multer.memoryStorage();
// const upload = multer({ storage });


const addGame = async (req, res) => {
  // Change image to be buffer using mutler library
  // image has to be in req.file not req.body
  const { admin } = req.user
  const { name, brand, desc, rating, price, sq, categoryId, img, platform, releaseDate } = req.body
  if (!admin) {
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  const db = await dbConnect;
  await db.request()
    .input('NAME', sql.VarChar, name)
    .input('Brand', sql.VarChar, brand)
    .input('Description', sql.VarChar, desc)
    .input('Rating', sql.Float, rating)
    .input('Price', sql.Int, price)
    .input('StockQuantity', sql.Int, sq)
    .input('CategoryId', sql.Int, categoryId)
    // CHANGE VARCHAR TO VARBINARY
    .input('Img', sql.VarChar, img)
    .input('Platform', sql.VarChar, platform)
    .input('ReleaseDate', sql.VarChar, releaseDate)
    .query("INSERT INTO Product VALUES(@NAME, @Brand, @Description, @Rating, @Price, @StockQuantity, @CategoryId, @Img, @Platform, @ReleaseDate)");

  res.status(StatusCodes.OK).send('Game Added Successfully')
}

const addCategory = async (req, res) => {
  const { admin } = req.user
  const { name, desc } = req.body
  if (!admin) {
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  const db = await dbConnect;
  await db.request()
    .input('Name', sql.VarChar, name)
    .input('Description', sql.VarChar, desc)
    .query("INSERT INTO Category (Name, Description) VALUES(@Name, @Description)");
  res.status(StatusCodes.CREATED).send('Category Added Successfully')
}

const modifyGame = async (req, res) => {
  const { params: { id }, user: { admin } } = req
  update = req.body
  if (!admin) {
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  const db = await dbConnect;
  await db.request()
    .input(Object.keys(update)[0], update[Object.keys(update)[0]])
    .input('ProductId', id)
    .query(`UPDATE Product SET ${Object.keys(update)[0]} = ${update[Object.keys(update)[0]]} WHERE ProductId = @ProductId`);

  res.status(StatusCodes.OK).send('Game Modified')
}

const modifyAdminAccess = async (req, res) => {
  const { params: { id }, user: { admin } } = req
  if (!admin) {
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  const db = await dbConnect;
  user = await db.request()
    .input('CustomerId', id)
    .query(`SELECT CustomerId, AdminState FROM Customer WHERE CustomerId = @CustomerId`);
  const adimnState = user.recordset[0].AdminState == 0 ? 1 : 0
  await db.request()
    .input('AdminState', adimnState)
    .input('CustomerId', user.recordset[0].CustomerId)
    .query(`UPDATE Customer SET AdminState = @AdminState WHERE CustomerId = @CustomerId`);
  res.status(StatusCodes.OK).send('Admin State Changed Successfully')
}

const deleteGame = async (req, res) => {
  const { params: { id }, user: { admin } } = req
  if (!admin) {
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  const db = await dbConnect;
  await db.request()
    .input('ProductId', id)
    .query("DELETE FROM Product WHERE ProductId = @ProductId");
  res.status(StatusCodes.OK).send('book deleted succesfully')
}

const addGameToCart = async (req, res) => {
  const { user: { customerId }, params: { id: productId }, body: { quantity } } = req
  const db = await dbConnect;
  cartId = await db.request()
    .input('CustomerId', customerId)
    .query("SELECT CartId FROM Cart WHERE CustomerId = @CustomerId");
  await db.request()
    .input('CartId', cartId.recordset[0].CartId)
    .input('Quantity', quantity)
    .input('ProductId', productId)
    .query("INSERT INTO CartItem VALUES (@Quantity, @CartId, @ProductId)");
  res.status(StatusCodes.OK).send('Game Added to Cart')
}

const getCartItems = async (req, res) => {
  const { customerId } = req.user
  const db = await dbConnect;
  cartId = await db.request()
    .input('CustomerId', customerId)
    .query("SELECT CartId FROM Cart WHERE CustomerId = @CustomerId");

  games = await db.request()
    .input('CartId', cartId.recordset[0].CartId)
    .query("SELECT * FROM CartItem WHERE CartId = @CartId");
  res.status(StatusCodes.OK).json({ count: games.recordset[0].length, games: games.recordset[0] })
}

const deleteCartItem = async (req, res) => {
  const { params: { id: productId }, user: { customerId } } = req
  const db = await dbConnect;
  cartId = await db.request()
    .input('CustomerId', customerId)
    .query("SELECT CartId FROM Cart WHERE CustomerId = @CustomerId");


  await db.request()
    .input('CartId', cartId.recordset[0].CartId)
    .input('ProductId', productId)
    .query("DELETE FROM CartItem WHERE CartId = @CartId AND ProductId = @ProductId");

  res.status(StatusCodes.OK).send('Game Deleted Successfully')
}

const addReview = async (req, res) => {
  const {id:productId} = req.params
  const {rating, comment} = req.body
  const db = await dbConnect;

  await db.request()
    .input('ProductId', productId)
    .input('Rating', rating)
    .input('Comment', comment)
    .query("INSERT INTO Review (ProductId, Rating, Comment) VALUES (@ProductId, @Rating, @Comment)");
    res.status(StatusCodes.OK).send('Review Added Successfully')
}

module.exports = {
  addGame,
  addCategory,
  deleteGame,
  modifyGame,
  modifyAdminAccess,
  addGameToCart,
  getCartItems,
  deleteCartItem,
  addReview
}