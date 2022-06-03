require('dotenv').config()

const connectDB = require('./db/connect')
const products = require('./models/product')
const parse = require('parse')



const jsonProducts = require('./product.json')

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL)
        await products.deleteMany()
        await products.create(jsonProducts)
        console.log("successfullllll......")
    } catch (error) {
        console.log(error)
    }
}

start()