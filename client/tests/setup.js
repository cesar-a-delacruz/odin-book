import { expect, afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: true,
    media: query,
  }));
});

afterEach(() => {
  cleanup();
});
