// Concept: a reply-all chain that eats itself. The setup is the intern's
// removal request and 300 colleagues piling on; the sting is the CEO doing
// exactly the same thing, proving nobody can escape the thread.
// 1 to 200 characters of UTF-8 text, not only whitespace.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "An intern emailed the whole company asking to be removed from the list, so 300 colleagues replied-all to agree — then the CEO replied-all: 'Same here. Please remove me too.'";

const outputDir = process.env.OUTPUT_DIR || process.env.MAKEFUN_OUTPUT_DIR || "/output";

function main(): void {
  const text = JOKE;
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`Gate failed: entry is ${length} characters, must be 1-200.`);
  }
  if (text.trim().length === 0) {
    throw new Error("Gate failed: entry is only whitespace.");
  }
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), text, "utf8");
  console.log(`Wrote entry (${length} chars) to ${join(outputDir, "entry.txt")}`);
}

main();
