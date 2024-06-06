const Product = require('../../models/productModel');
const deleteProduct = async (req, res) => {

        const { _id } = req.body;
        const product = await Product.findByIdAndDelete(_id);
        res.json({
            message: "Product Deleted",
            error: false,
            success: true,
            data: product
        })
}

module.exports =  deleteProduct ;