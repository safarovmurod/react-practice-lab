import { Link, Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
      <nav className="flex items-center justify-center gap-2 border-b border-slate-200 bg-white px-4 py-4">
         <Link className="rounded-lg px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900" to={'/'}>Home</Link>
         <Link className="rounded-lg px-5 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900" to={'/about'}>About</Link>
      </nav>
      <Outlet/>
    </div>
  )
}
export default Layout