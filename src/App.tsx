import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./pages/RedaxToolkit"
import Practika2 from "./pages/Zustand"
import RedaxToolkiy from "./pages/RedaxToolkit"
import Zustand from "./pages/Zustand"
import Jotai from "./pages/Jotai"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <RedaxToolkiy/>,
      },
      {
        path: "/zustand",
        element: <Zustand/>,
      },
      {
        path: "/jotai",
        element: <Jotai/>,
      },
    ],
  },
])

export default function App() {
 
   
  return <RouterProvider router={router} />
}