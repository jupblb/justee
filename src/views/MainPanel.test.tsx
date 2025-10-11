import React from "react";
import { render, screen, act } from "@testing-library/react";
import MainPanel from "./MainPanel";

jest.mock("../data/syllables", () => ({
  __esModule: true,
  default: {
    2: ["ab", "cd", "ef", "gh", "ij"],
    3: ["abc", "def", "ghi", "jkl", "mno"],
    4: ["abcd", "efgh", "ijkl", "mnop", "qrst"],
  },
}));

jest.mock("@enact/sandstone/Panels", () => ({
  Panel: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

jest.mock("@enact/spotlight/Spottable", () => {
  const React = require("react");

  const stripSpotlightProps = (props: Record<string, unknown>) => {
    const cleaned: Record<string, unknown> = {};
    Object.keys(props).forEach((key) => {
      if (!key.startsWith("onSpotlight")) {
        cleaned[key] = props[key];
      }
    });
    return cleaned;
  };

  return (Wrapped: React.ComponentType<any>) =>
    React.forwardRef((props, ref) =>
      React.createElement(Wrapped, { ...stripSpotlightProps(props), ref }),
    );
});

jest.mock("@enact/spotlight/SpotlightContainerDecorator", () => {
  return () => (component: any) => component;
});

describe("MainPanel", () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("displays initial syllable", () => {
    render(<MainPanel />);
    expect(screen.getByText("ABC")).toBeDefined();
  });

  it("adds dimming class after 60 seconds of inactivity", () => {
    const { container } = render(<MainPanel />);

    const containerDiv = container.querySelector(".container");
    expect(containerDiv?.className).not.toContain("dimming");

    act(() => {
      jest.advanceTimersByTime(60000);
    });

    expect(containerDiv?.className).toContain("dimming");
  });
});
