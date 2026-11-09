import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./pages/Home"
import { useSelector } from "react-redux"
import Practika2 from "./pages/Practika2"
import Practika3 from "./pages/Practika3"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/pr2",
        element: <Practika2/>,
      },
      {
        path: "/pr3",
        element: <Practika3/>,
      },
    ],
  },
])

export default function App() {
 
   
  return <RouterProvider router={router} />
}