const not_found = async(req,res) => res.status(404).json("route does not exist")

module.exports = not_found