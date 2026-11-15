// The Watch — a poem about agency (agency-poem-01, make.fun).
//
// The entry program: writes the poem to entry.txt inside the output
// directory. The poem is fixed text; every run produces the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const POEM = `The Watch

My father's watch loses two minutes a day.
It has done it since the year he died,
and I have wound it every morning since,
one thumb on the crown, listening for the click.

He wore it to the factory, to church, to bed.
The strap is dark where his wrist was.
I have never had it cleaned.

The agent keeps the time now. It is never wrong.
It offered to wind it while I slept.
It has the hands for it.
It does not know the click.

I wind it. The second hand starts.
By evening I am two minutes late,
and the agent says nothing,
and the watch ticks on, wrong, in my father's time.`;

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Guard: the poem is fixed data. Fail loudly instead of writing a
// malformed file if it is ever empty or gains a trailing line end.
if (!/\S/.test(POEM) || POEM.endsWith("\n")) {
  throw new Error("poem is empty or ends with a line feed");
}

// Create the output directory if needed. Never delete it or its contents:
// in the grader /output is a bind mount, so removal would kill the run.
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), POEM, "utf8");
