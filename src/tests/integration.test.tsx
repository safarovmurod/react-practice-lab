import { cleanup, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { afterEach, expect, test, vi } from "vitest"
import Home from "@/pages/Home"
import { store } from "@/store/store"
import { todoData } from "@/store/todoSlice"

vi.mock("@/components/Image", () => ({ CarouselDemo: () => null }))
vi.mock("@/components/DialogAdd", () => ({ DialogAdd: () => null }))
vi.mock("@/components/DialogEdit", () => ({ DialogEdit: () => null }))

afterEach(() => {
  cleanup()
  store.dispatch(todoData.util.resetApiState())
  vi.unstubAllGlobals()
})

test("Home shows the user from API", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({
    data: [{ id: 1, name: "Ali", description: "Student", isCompleted: false, images: [] }],
    errors: [],
    statusCode: 200,
  })))

  render(<Provider store={store}><Home /></Provider>)

  expect(await screen.findByRole("heading", { name: "Ali" })).toBeTruthy()
  expect(screen.getByText("Student")).toBeTruthy()
})
