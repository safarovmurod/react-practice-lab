import { NavLink, Outlet } from "react-router-dom"

export default function Sync() {
  return (
    <div>
      <nav className="mb-[24px] flex gap-[20px]">
        <NavLink to="/sync" end className="[&.active]:underline">Jotai</NavLink>
        <NavLink to="/sync/redux" className="[&.active]:underline">Redux</NavLink>
        <NavLink to="/sync/zustand" className="[&.active]:underline">Zustand</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}
