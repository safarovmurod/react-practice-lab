import { NavLink, Outlet } from "react-router-dom"

export default function Async() {
  return (
    <div>
      <nav className="mb-[24px] flex gap-[20px]">
        <NavLink to="/async" end className="[&.active]:underline">Jotai</NavLink>
        <NavLink to="/async/redux" className="[&.active]:underline">Redux</NavLink>
        <NavLink to="/async/zustand" className="[&.active]:underline">Zustand</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}
