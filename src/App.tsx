import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "@/layout/Layout"
import Zustand from "@/pages/Zustand"
import Jotai from "@/pages/Jotai"

const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         { index: true, element: <Zustand /> },
         { path: "jotai", element: <Jotai /> },
      ],
   },
])

export default function App() {
   return <RouterProvider router={router} />
}
