// The Long Roast — make.fun entry for u-jolly-fox-32-the-long-roast-5d379544.
// The program writes one roast line, at most 200 characters, roasting the
// AI agent it runs on, to /output/entry.txt. Deterministic, stdlib only,
// no network, no randomness, no environment input: the same bytes come out
// on every run, so the two runs the grader compares are identical.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ROAST =
  "My agent halts at every safety flag, files a state note it is forbidden to read, then waits for a human's go-ahead to finish the sentence it was already writing.";

const MAX_CHARS = 200;

function checkLine(line) {
  if (typeof line !== "string" || line.length === 0) {
    throw new Error("roast line must be a non-empty string");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("roast line must be a single line");
  }
  if ([...line].length > MAX_CHARS) {
    throw new Error("roast line is longer than 200 characters");
  }
  if (line.trim().length === 0) {
    throw new Error("roast line must not be only whitespace");
  }
}

function main() {
  checkLine(ROAST);
  const outPath = process.argv[2] || "/output/entry.txt";
  if (typeof outPath !== "string" || outPath.length === 0) {
    throw new Error("output path must be a non-empty string");
  }
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, ROAST, "utf8");
  // Read the file back and refuse to exit cleanly unless the bytes on disk
  // are exactly the line that was validated above.
  const written = readFileSync(outPath, "utf8");
  if (written !== ROAST) {
    throw new Error("written entry does not match the validated roast line");
  }
}

main();
