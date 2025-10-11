jest.mock(
  "../../data/syllables-2.json",
  () => [
    { text: "ab", occurrences: 100 },
    { text: "cd", occurrences: 50 },
    { text: "ef", occurrences: 25 },
    { text: "gh", occurrences: 10 },
    { text: "ij", occurrences: 5 },
  ],
  {
    virtual: true,
  },
);

jest.mock(
  "../../data/syllables-3.json",
  () => [
    { text: "abc", occurrences: 200 },
    { text: "def", occurrences: 150 },
    { text: "ghi", occurrences: 100 },
    { text: "jkl", occurrences: 75 },
    { text: "mno", occurrences: 50 },
  ],
  {
    virtual: true,
  },
);

jest.mock(
  "../../data/syllables-4.json",
  () => [
    { text: "abcd", occurrences: 300 },
    { text: "efgh", occurrences: 250 },
    { text: "ijkl", occurrences: 200 },
    { text: "mnop", occurrences: 150 },
    { text: "qrst", occurrences: 100 },
  ],
  {
    virtual: true,
  },
);

import POLISH_SYLLABLES from "./syllables";

describe("POLISH_SYLLABLES", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Math, "random").mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("exports an object with keys 2, 3, and 4", () => {
    expect(POLISH_SYLLABLES).toHaveProperty("2");
    expect(POLISH_SYLLABLES).toHaveProperty("3");
    expect(POLISH_SYLLABLES).toHaveProperty("4");
    expect(Object.keys(POLISH_SYLLABLES)).toEqual(["2", "3", "4"]);
  });

  it("each key contains an array of strings", () => {
    expect(Array.isArray(POLISH_SYLLABLES[2])).toBe(true);
    expect(Array.isArray(POLISH_SYLLABLES[3])).toBe(true);
    expect(Array.isArray(POLISH_SYLLABLES[4])).toBe(true);

    POLISH_SYLLABLES[2].forEach((item) => {
      expect(typeof item).toBe("string");
    });
    POLISH_SYLLABLES[3].forEach((item) => {
      expect(typeof item).toBe("string");
    });
    POLISH_SYLLABLES[4].forEach((item) => {
      expect(typeof item).toBe("string");
    });
  });

  it("contains all syllables from the source data", () => {
    expect(POLISH_SYLLABLES[2]).toHaveLength(5);
    expect(POLISH_SYLLABLES[3]).toHaveLength(5);
    expect(POLISH_SYLLABLES[4]).toHaveLength(5);

    const syllables2Texts = ["ab", "cd", "ef", "gh", "ij"];
    const syllables3Texts = ["abc", "def", "ghi", "jkl", "mno"];
    const syllables4Texts = ["abcd", "efgh", "ijkl", "mnop", "qrst"];

    expect(POLISH_SYLLABLES[2].sort()).toEqual(syllables2Texts.sort());
    expect(POLISH_SYLLABLES[3].sort()).toEqual(syllables3Texts.sort());
    expect(POLISH_SYLLABLES[4].sort()).toEqual(syllables4Texts.sort());
  });
});
