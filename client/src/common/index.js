// import { useParams } from "react-router-dom"
const backendDomin = "http://localhost:8080"
// eslint-disable-next-line react-hooks/rules-of-hooks
const SummaryApi = {
    signUP : {
        url : `${backendDomin}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${backendDomin}/api/signin`,
        method : "post"
    },
    deleteProduct : {
        url : `${backendDomin}/api/delete-product`,
        method : "post"
    },
    Update_current_user : {
        url : `${backendDomin}/api/update-current`,
        method : "put"
    },
    current_user : {
        url : `${backendDomin}/api/user-details`,
        method : "get"
    },
    forgotPassword : {
        url : `${backendDomin}/api/forgot-password`,
        method : "post"
    },
    resetPassword : {
        url : `${backendDomin}/api/reset-password`,
        method : "put"
    },
    logout_user : {
        url : `${backendDomin}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomin}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomin}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${backendDomin}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomin}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomin}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${backendDomin}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomin}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomin}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomin}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomin}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomin}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomin}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomin}/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomin}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomin}/api/filter-product`,
        method : 'post'
    },
    // order
    orderCreate : {
        url : `${backendDomin}/api/create-order`,
        method : 'post'
    },
    orderGet : {
        url : `${backendDomin}/api/get-orders`,
        method : 'get'
    },
    updateOrder : {
        url : `${backendDomin}/api/update-order`,
        method : 'post'
    },

}


export default SummaryApi