import { NavLink, Outlet } from "react-router-dom"

export default function Layout() {
   return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-10">
         <nav className="max-w-6xl mx-auto mb-6 flex gap-3 text-slate-300">
            <NavLink to="/" end className="rounded-lg px-4 py-2 aria-[current=page]:bg-slate-700 aria-[current=page]:text-white">
               Zustand
            </NavLink>
            <NavLink to="/jotai" className="rounded-lg px-4 py-2 aria-[current=page]:bg-slate-700 aria-[current=page]:text-white">
               Jotai
            </NavLink>
         </nav>
         <Outlet />
      </div>
   )
}
