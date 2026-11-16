import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, expect, test, vi } from "vitest"
import { Button } from "@/components/ui/button"

afterEach(cleanup)

test("Button click works, disabled Button does not", () => {
  const click = vi.fn()

  const { rerender } = render(<Button onClick={click}>Add</Button>)
  fireEvent.click(screen.getByRole("button", { name: "Add" }))
  expect(click).toHaveBeenCalledOnce()

  rerender(<Button disabled onClick={click}>Add</Button>)
  fireEvent.click(screen.getByRole("button", { name: "Add" }))
  expect(click).toHaveBeenCalledOnce()
})
