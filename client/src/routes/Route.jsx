import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import SignUp from '../pages/Register';
import Login from '../pages/Login';
import ForgotPassowrd from '../pages/ForgotPassowrd';
import Home from '../pages/Home';
import Cart from '../pages/cart/Cart.jsx';
import AdminPanel from '../pages/admin/AdminPanel';
import AllUsers from '../pages/admin/users/AllUsers.jsx';
import AllProducts from '../pages/admin/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import SearchProduct from '../pages/SearchProduct';
import ProductDetails from '../pages/ProductDetails';
import ResetPassword from "../pages/ResetPassword";
import {Profile} from '../pages/profile/Profile.jsx';
import MyAccount from "../pages/profile/MyAccount.jsx";
import {Address} from "../pages/profile/Address.jsx";
import Orders from "../pages/profile/Orders.jsx";
import {OrderPage} from "../pages/order/OrderPage.jsx";
import {OrderAdmin} from "../pages/admin/order/orders.jsx";
import {Success} from "../components/success.jsx";
import {Cancel} from "../components/cancel.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "orders",
        element: <OrderPage />
      },
      {
        path: "forgot-password",
        element: <ForgotPassowrd />
      },
      {
        path: "sign-up",
        element: <SignUp />
      },
      {
        path:"profile",
        element: <Profile />,
        children: [
          {
            path: "my-account",
            element: <MyAccount />
          },
          {
            path: "address",
            element: <Address />
          },
          {
            path: "order",
            element: <Orders />
          }
        ]
      },
      {
        path: "reset-password/:id",
        element: <ResetPassword />
      },
      {
        path: "product-category",
        element: <CategoryProduct />
      },
      {
        path: "product/:id",
        element: <ProductDetails />
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: "success",
        element: <Success />
      },
      {
        path: "cancel",
        element: <Cancel />
      },
      {
        path: "search",
        element: <SearchProduct />
      },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />
          },
          {
            path: "all-products",
            element: <AllProducts />
          },
          {
            path: "all-orders",
            element: <OrderAdmin />
          }
        ]
      },
    ]
  }
])

export default router