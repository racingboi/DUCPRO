const orders = require('../../models/OrderModel');
const Cart = require('../../models/cartProduct');
const createOrder = async (req, res) => {
    try {
        const { detail, paymentMethod, userId, total } = req.body;
        const order = new orders({
            detail,
            userId,
            paymentMethod,
            total
        })
        await order.save();
        res.json({
            message: "Order Created",
            error: false,
            success: true,
            data: order
        })
    } catch (error) {
        res.json({
            message: "Order Not Created",
            error: true,
            success: false,
            data: error
        })
    }
   // if(success = true){
   //     await Cart.deleteMany({ userId: userId});
   // }
}

const getOrders = async (req, res) => {
     try {
          const order = await orders.find({});
          res.json({
                message: "Orders Found",
                error: false,
                success: true,
                data: order
          })
     } catch (error) {
          res.json({
                message: "Orders Not Found",
                error: true,
                success: false,
                data: error
          })
     }
}

const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findById(id);
        res.json({
            message: "Order Found",
            error: false,
            success: true,
            data: order
        })

}
    catch (error) {
        res.json({
            message: "Order Not Found",
            error: true,
            success: false,
            data: error
        })
    }
}
const updateOrder = async (req, res) => {
    try {
        const { status, orderId } = req.body;
        const order = await orders.findByIdAndUpdate({ _id: orderId }, { status }, { new: true });
        res.json({
            message: "Order Updated",
            error: false,
            success: true,
            data: order
        })

    } catch (error) {
        res.json({
            message: "Order Not Updated",
            error: true,
            success: false,
            data: error
        })
    }
}

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order
        = await
        orderModel.findByIdAndDelete(id);
        res.json({
            message: "Order Deleted",
            error: false,
            success: true,
            data: order
        })
}
    catch (error) {
        res.json({
            message: "Order Not Deleted",
            error: true,
            success: false,
            data: error
        })
    }
}

module.exports = { createOrder, getOrders, getOrder, updateOrder, deleteOrder };