require('dotenv').config();
require('express-async-errors');
const express = require('express');
const noAuthRoutes = require('./routes/no-auth-routes')
const reqAuthRoutes = require('./routes/req-auth-routes')
const auth = require('./routes/auth')
const routeAuth = require('./middleware/route-auth')
const app = express();
const errorHandlerMiddleware = require('./middleware/error-handler')

//extra security packages

//routes
app.use(express.json());
app.use('/api/v1', noAuthRoutes)
app.use('/api/v1/auth', auth)
app.use('/api/v1/user', routeAuth, reqAuthRoutes)

//error handlers
app.use(errorHandlerMiddleware)

//const port = process.env.PORT || 3000;
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>{
      console.log(`Server is listening on port ${port}...`)
      console.log('latest commit')
    }
    );
  } catch (error) {
    console.log(error);
  }
};

start();
