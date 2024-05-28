import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import SignUp from '../pages/Register';
import Login from '../pages/Login';
import ForgotPassowrd from '../pages/ForgotPassowrd';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import AdminPanel from '../pages/admin/AdminPanel';
import AllUsers from '../pages/admin/AllUsers';
import AllProducts from '../pages/admin/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import SearchProduct from '../pages/SearchProduct';
import ProductDetails from '../pages/ProductDetails';
import ResetPassword from "../pages/ResetPassword";
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
        path: "forgot-password",
        element: <ForgotPassowrd />
      },
      {
        path: "sign-up",
        element: <SignUp />
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
          }
        ]
      },
    ]
  }
])

export default router