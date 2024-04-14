import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './ui/Home'
import Menu, { loader as menuLoader } from './features/menu/Menu'

import Cart from './features/cart/Cart'
import CreateOrder, {
    action as createOrderAction,
} from './features/order/CreateOrder'
import Order, { loader as orderLoader } from './features/order/Order'
import AppLayout from './ui/AppLayout'
import Error from './ui/Error'
//* this is a function now where we define all routes,
//* and we do that by passing in an array of objects
//* where each object is one route.
const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/menu',
                element: <Menu />,
                loader: menuLoader, //& provide the loader to a route (/menu)
                errorElement: <Error />, //* so the error to appear within the layout, place it because here we load data, so things can go wrong
            },
            {
                path: '/cart',
                element: <Cart />,
            },
            {
                path: '/order/new',
                element: <CreateOrder />,
                action: createOrderAction,
            },
            {
                path: '/order/:orderId',
                element: <Order />,
                loader: orderLoader,
                errorElement: <Error />,
            },
        ],
    },
])
// const router = createBrowserRouter([
//   {
//     element: <AppLayout />,
//     path: "/",
//   },
//   { path: "/menu", element: <Menu /> },
//   {
//     path: "/cart",
//     element: <Cart />,
//   },
//   {
//     path: "/order/new",
//     element: <CreateOrder />,
//   },
//   {
//     path: "/order/:orderId",
//     element: <Order />,
//   },
// ]);

function App() {
    return <RouterProvider router={router} />
}

export default App
