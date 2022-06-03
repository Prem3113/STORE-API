const errorHandlerMiddleware = require('./middleware/errorhandler')
const not_found = require('./middleware/not-found')
const express = require("express")
const connectDB = require('./db/connect')
const app = express()
const getProducts = require("./routes/product")
require('dotenv').config()
app.use(express.json())

app.get('/', (req,res) => {
    res.send('<h1>Store api</h1><a href = "/api/v1/products">products routes</a>')
})
app.use("/api/v1/products",getProducts)
app.use(errorHandlerMiddleware)
app.use(not_found)

const port =  3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URl)
        console.log('connected to database....')
        app.listen(port, console.log(`server is running at port ${port}....`))
    } catch (error) {
        console.log(error)
    }
}
start()