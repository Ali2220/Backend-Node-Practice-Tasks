const express = require("express");
const app = express();
const {MongoDbConnection}= require('./src/config/db')
const authRoutes = require('./src/routes/authRoutes')
const profileRoutes = require('./src/routes/profileRoutes')
const cookieParser = require('cookie-parser')
const errorHandler = require('./src/middleware/errorMiddleware')
MongoDbConnection()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)

app.use(errorHandler)

app.listen(3000)