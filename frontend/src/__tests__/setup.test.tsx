import { render, screen } from "@testing-library/react";

describe("Test Setup", () => {
  it("should work with testing-library", () => {
    render(<div data-testid="test">Test</div>);
    expect(screen.getByTestId("test")).toBeInTheDocument();
  });
});
