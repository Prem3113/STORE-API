const Products = require('../models/product')

const getAllproductsStatic = async(req,res) => {
    //const search  = 'ab'
   // const products = await Products.find({name:{$regex:search,$options :'i'}})
   const products = await Products.find({price:{$gt:30}}).sort('price').select('name price')

    res.status(200).json({products,nhits:products.length})
}

const getAllProducts = async(req,res) => {
    const {featured,company,name,sort,fields,numericfilters} = req.query
    const queryOb = {}
    if(featured){
        queryOb.featured = featured === 'true'? true : false
    }
   if(company){
       queryOb.company = company
   }
   if(name){
       queryOb.name={$regex:name,$options:'i'}
   }
    let results = Products.find(queryOb)
    if(sort){
        const shortlist = sort.split(',').join(' ')
        results = results.sort(shortlist) 
    }
    else{
        results = results.sort('createdAt')
    }
    if(fields){
        const shortfields = fields.split(',').join(' ')
        results = results.select(shortfields)
    }
    if(numericfilters){
        const operatormap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$e',
            '<':'$lt',
            '<=':'$lte',
        }
        const reGex = /\b(<|>|=|<=|>=)\b/g
        let filters =  numericfilters.replace(reGex,(match) => {`-${operatormap[match]}-`})
        filters = filters.split(',').forEach((item) => {
            const options = ['price','rating']
            const[field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryOb[field] = {[operator]:Number(value)}
            }
        })
    }
    console.log(queryOb)
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1)*limit
    results = results.skip(skip).limit(limit)
    const products = await results

    res.status(200).json({products,nHits:products.length})
}

module.exports = {getAllProducts,getAllproductsStatic}