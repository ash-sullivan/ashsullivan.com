import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlayArea from "./PlayArea";

describe("PlayArea component tests", () => {
  it("loads and displays PlayArea with default settings", async () => {
    const defaultSettings = {
      onClick: jest.fn(),
      onFishHooked: jest.fn(),
      isReelCast: false,
      isFishHooked: false,
      hookPosition: { x: 0, y: 0 },
    };

    render(<PlayArea {...defaultSettings} />);

    const feeshImage = screen.queryByAltText("Feesh");
    const hookImage = screen.queryByAltText("Fish hook");

    expect(feeshImage).toBeInTheDocument();
    expect(feeshImage).toHaveAttribute(
      "src",
      expect.stringContaining("feesh.png")
    );
    expect(hookImage).not.toBeInTheDocument();
  });

  it("shows the fish hook if the reel is cast", () => {
    const props = {
      onClick: jest.fn(),
      onFishHooked: jest.fn(),
      isReelCast: true,
      isFishHooked: false,
      hookPosition: { x: 100, y: 100 },
    };

    render(<PlayArea {...props} />);

    const feeshImage = screen.queryByAltText("Feesh");
    const hookImage = screen.getByAltText("Fish hook");
    const hook = screen.getByTestId("hook");

    expect(feeshImage).toBeInTheDocument();
    expect(feeshImage).toHaveAttribute(
      "src",
      expect.stringContaining("feesh.png")
    );

    expect(hookImage).toBeInTheDocument();
    expect(hookImage).toHaveAttribute(
      "src",
      expect.stringContaining("fish-hook.png")
    );

    expect(hook).toBeInTheDocument();
    expect(hook).toHaveStyle({
      left: "100px",
      top: "100px",
    });
  });

  it("does not show the fish if it is caught", () => {
    const props = {
      onClick: jest.fn(),
      onFishHooked: jest.fn(),
      isReelCast: true,
      isFishHooked: true,
      hookPosition: { x: 0, y: 0 },
    };

    render(<PlayArea {...props} />);

    const feeshImage = screen.queryByAltText("Feesh");
    const hookImage = screen.queryByAltText("Fish hook");

    expect(feeshImage).not.toBeInTheDocument();
    expect(hookImage).toBeInTheDocument();
  });
});
