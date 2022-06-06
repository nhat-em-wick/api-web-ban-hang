const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const categoryRoute = require("./routes/category");
const orderRoute = require('./routes/order')
const cartRoute = require("./routes/cart");
const mailRoute = require('./routes/mail')
const adminRoute = require('./routes/admin')

const prefix = '/api/v1';

mongoose.connect(process.env.DB_URL, () => {
  console.log("connect db");
});

app.use(
  cors({
    origin: process.env.URL_CLIENT,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API web bán hàng',
      version: '1.0.0',
    },
    servers:[
      {url: `${process.env.URL_SERVER}${prefix}`}
    ]
    
  },
  apis: ['./api-docs/*.js'],
};

const openapiSpecification = swaggerJsDoc(options);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(openapiSpecification))

app.use(`${prefix}/auth`, authRoute);
app.use(`${prefix}/products`, productRoute);
app.use(`${prefix}/orders`, orderRoute)
app.use(`${prefix}/users`, userRoute);
app.use(`${prefix}/categories`, categoryRoute);
app.use(`${prefix}/cart`, cartRoute);
app.use(`${prefix}/mail`, mailRoute);
app.use(`${prefix}/admin`, adminRoute)

app.use("*", (req, res) => {
  res.send("404");
});

app.listen(PORT, () => {
  console.log("server start: " + PORT);
});




