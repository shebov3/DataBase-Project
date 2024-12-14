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
  const { name, brand, desc, rating, price, sq, categoryId, imgs, platform, releaseDate } = req.body
  if (!admin) {
    throw new CustomAPIError('this user has no access to this route', StatusCodes.UNAUTHORIZED)
  }
  const db = await dbConnect;
  productId = await db.request()
    .input('NAME', sql.VarChar, name)
    .input('Brand', sql.VarChar, brand)
    .input('Description', sql.VarChar, desc)
    .input('Rating', sql.Float, rating)
    .input('Price', sql.Int, price)
    .input('StockQuantity', sql.Int, sq)
    .input('CategoryId', sql.Int, categoryId)
    .input('Platform', sql.VarChar, platform)
    .input('ReleaseDate', sql.VarChar, releaseDate)
    .query("INSERT INTO Product VALUES(@NAME, @Brand, @Description, @Rating, @Price, @StockQuantity, @CategoryId, @Platform, @ReleaseDate);SELECT SCOPE_IDENTITY() AS ProductId;");

  imgs.map(async (img)=>{
    await db.request()
    .input('ProductId', productId.recordset[0].ProductId)
    // CHANGE VARCHAR TO VARBINARY
    .input('Img', sql.VarChar, img)
    .query("INSERT INTO Product_IMG VALUES(@ProductId, @Img)")
  })


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
  const { customerId } = req.user;
  const db = await dbConnect;

  const cartIdResult = await db.request()
    .input('CustomerId', customerId)
    .query("SELECT CartId FROM Cart WHERE CustomerId = @CustomerId");

  const cartId = cartIdResult.recordset[0].CartId;

  const games = await db.request()
    .input('CartId', cartId)
    .query(`
      SELECT 
        p.ProductId,
        p.Name, 
        p.Price,
        p.Brand,
        p.platform,
        ci.Quantity
      FROM CartItem ci
      INNER JOIN Product p ON ci.ProductId = p.ProductId
      WHERE ci.CartId = @CartId
    `);

  res.status(StatusCodes.OK).json({ games: games.recordset });

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

const placeOrder = async (req, res) => {
  const { user: { customerId }, body: {cartItems, total} } = req
  const db = await dbConnect;
  let orderId = await db.request()
    .input('CustomerId', customerId)
    .input('TotalAmount', total)
    .input('AmountPaid', total)
    .query(`
      INSERT INTO TheOrder (CustomerId, TotalAmount, AmountPaid)
      OUTPUT INSERTED.OrderId
      VALUES (@CustomerId, @TotalAmount, @AmountPaid)
    `);

  orderId = orderId.recordset[0].OrderId;

  let orderItemId = await db.request()
    .input('Price', total)
    .input('OrderId', orderId)
    .query(`
      INSERT INTO OrderItem
      OUTPUT INSERTED.OrderItemId
      VALUES (@Price, @OrderId)
    `);
  orderItemId = orderItemId.recordset[0].OrderItemId;


  cartItems.map(async (item)=>{
    await db.request()
    .input('OrderItemId', orderItemId)
    .input('ProductId', item.ProductId)
    .input('Quantity', item.Quantity)
    .query(`
      INSERT INTO OrderItemProducts
      VALUES (@OrderItemId, @ProductId, @Quantity)
    `);
  })

  
  res.status(StatusCodes.CREATED).send('Order Placed Successfully')
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
  addReview,
  placeOrder
}