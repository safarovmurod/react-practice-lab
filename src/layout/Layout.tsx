import { NavLink, Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="mx-auto max-w-[1280px] px-[16px]">
      <nav className="flex gap-[24px] border-b py-[20px]">
        <NavLink to="/sync" className="[&.active]:font-bold [&.active]:underline">Sync</NavLink>
        <NavLink to="/async" className="[&.active]:font-bold [&.active]:underline">Async</NavLink>
      </nav>
      <main className="py-[24px]">
        <Outlet />
      </main>
    </div>
  )
}
