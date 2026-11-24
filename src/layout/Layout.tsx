import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="mx-auto max-w-[1200px] px-[16px]">
      <nav className="flex gap-[24px] border-b py-[20px]">
        <NavLink to="/" end className="[&.active]:underline">Home</NavLink>
      </nav>
      <main className="py-[24px]">
        <Outlet />
      </main>
    </div>
  )
}
