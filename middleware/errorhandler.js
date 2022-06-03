const errorHandlerMiddleware = async(err,req,res,next) => {
    console.log(err)
    return res.status(500).json({msg:"sorry, something went wrong , please try again later"})
}

module.exports = errorHandlerMiddleware