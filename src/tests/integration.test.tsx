// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, expect, test, vi } from "vitest"
import axios from "axios"
import App from "@/App"
import { api } from "@/data/api"

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

test("App shows the user from API", async () => {
  vi.spyOn(axios, "get").mockResolvedValue({
    data: [{ id: "1", name: "Ali", job: "Student", img: "" }],
  })

  render(<App />)

  expect(await screen.findByRole("heading", { name: "Ali" })).toBeTruthy()
  expect(screen.getByText("Student")).toBeTruthy()
  expect(axios.get).toHaveBeenCalledWith(api)
})
