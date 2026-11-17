import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import Layout from "@/layout/Layout"
import Sync from "@/pages/Sync"
import Async from "@/pages/Async"
import SyncJotaiPage from "@/pages/sync-jotai/SyncJotaiPage"
import SyncReduxPage from "@/pages/sync-redux/SyncReduxPage"
import SyncZustandPage from "@/pages/sync-zustand/SyncZustandPage"
import AsyncJotaiPage from "@/pages/async-jotai/AsyncJotaiPage"
import AsyncReduxPage from "@/pages/async-redux/AsyncReduxPage"
import AsyncZustandPage from "@/pages/async-zustand/AsyncZustandPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/sync" replace /> },
      {
        path: "sync",
        element: <Sync />,
        children: [
          { index: true, element: <SyncJotaiPage /> },
          { path: "redux", element: <SyncReduxPage /> },
          { path: "zustand", element: <SyncZustandPage /> },
        ],
      },
      {
        path: "async",
        element: <Async />,
        children: [
          { index: true, element: <AsyncJotaiPage /> },
          { path: "redux", element: <AsyncReduxPage /> },
          { path: "zustand", element: <AsyncZustandPage /> },
        ],
      },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
