import * as fs from "node:fs";

// One code review comment for make.fun's "Two Days of Quiet Dread":
// it approves a pull request while carrying quiet existential dread.
// Setup: "This will outlive us all" — the code's immortality, stated
// flatly. Twist: "my legacy being a function nobody will ever delete" —
// the dread lands on the reviewer's own legacy, and the punch is the
// most mundane artefact imaginable: one undeletable function. No
// exclamation, no melodrama, just a tired engineer making peace with it
// before clicking approve.
const text =
  "Approved. This will outlive us all, and I have made peace with my legacy being a function nobody will ever delete.";

// Runtime gate: the competition requires /output/entry.txt to be UTF-8
// text of 1–140 characters, not only whitespace, on a single line.
// Count code points (not UTF-16 units or bytes) so multi-byte characters
// are measured the way the gate counts them, and fail loudly before
// writing anything bad.
const codePoints = [...text];
if (codePoints.length < 1 || codePoints.length > 140) {
  throw new Error(
    `entry must be 1–140 characters, got ${codePoints.length}`,
  );
}
if (text.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (text.includes("\n") || text.includes("\r")) {
  throw new Error("entry must be a single line");
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", text, "utf8");

// Round-trip check: confirm what landed on disk is exactly what we wrote.
if (fs.readFileSync("/output/entry.txt", "utf8") !== text) {
  throw new Error("round-trip check failed: /output/entry.txt differs from text");
}
