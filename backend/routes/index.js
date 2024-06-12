const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/user/userSignUp")
const userSignInController = require('../controller/user/userSignIn')
const userDetailsController = require('../controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/user/userLogout')
const allUsers = require('../controller/user/allUsers')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProductController = require('../controller/product/getProduct')
const updateProductController = require('../controller/product/updateProduct')
const getCategoryProduct = require('../controller/product/getCategoryProductOne')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/user/addToCartController')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViewProduct  = require('../controller/user/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')
const forgotPassword = require('../controller/user/ForgotPassowrd')
const resetPassword = require('../controller/user/ResetPassword')
const deleteProduct = require('../controller/product/deleteProduct')
const updateCurrent = require('../controller/user/updateCurrent')
const { createOrder, getOrders, getOrder, updateOrder, deleteOrder, updatePayment } = require('../controller/orders/OrderControler')

// vnpay
const {create_payment_url, sendSuccessEmail ,vnpay_return} = require('../controller/orders/VNP')
// momo
const {PayMomo} = require('../controller/orders/momo/momo')

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/userLogout",userLogout)
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token',resetPassword);
router.put('/update-current',updateCurrent)


//admin panel 
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)
router.post("/delete-product",authToken,deleteProduct)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)


// order
router.post("/create-order",createOrder);
router.get("/get-orders",getOrders);
router.get("/get-order",getOrder);
router.post("/update-order",updateOrder);
router.post("/delete-order/:id",authToken,deleteOrder);
router.post("/update-payment",updatePayment);

// payment
router.post("/create-payment-url",create_payment_url);
router.get("/vnpay-return",vnpay_return);
router.post("/send-mail",sendSuccessEmail);
router.post("/create-momo-payment",PayMomo);






module.exports = router