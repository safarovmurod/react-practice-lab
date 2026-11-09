import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav className="w-[20%] m-auto mt-7 flex items-center justify-between">
         <Link className="border-1 p-2 flex-col ml-1 rounded-xl hover:bg-green-500" to={'/'}>Home</Link>
         <Link className="border-1 p-2 flex-col ml-1 rounded-xl hover:bg-green-500" to={'pr2'}>Zustand-Sync2</Link>
         <Link className="border-1 p-2 flex-col ml-1 rounded-xl hover:bg-green-500" to={'pr3'}>Zustand-Sync3</Link>
      </nav>
      <Outlet/>
    </div>
  )
}