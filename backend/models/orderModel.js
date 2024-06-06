const mongoose = require('mongoose')
const orders = mongoose.Schema({
    detail : {
        address : String,
        productId:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }],
    },
    userId : String,
    status : {
        type : String,
        default : "pending"
    },
    paymentMethod : String,
    paymentStatus : {
        type: String,
        default: "pending"
    },
    total: Number,

},

    {
    timestamps : true
})


const orderModel = mongoose.model("order",orders)
module.exports = orderModel;