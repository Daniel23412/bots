# Mines

## Source project observation
The existing `creative-games-studio` Mines wrapper loads a local HAR replay and exposes a 5×5 Cave Mines experience. It forwards language/currency parameters into the local replay and identifies the replay with local HAR query parameters.

## Signal implementation
- Grid: 25 cells (5×5)
- Options: 1 / 3 / 5 / 7 mines
- Suggested cells: 5–8 / 4–6 / 3–5 / 2–4 respectively
- Output is a simulation hint only; it does not inspect or predict live casino RNG.

## HAR
Run `npm run parse:har -- ./har/mines.har`. The normalized file is written to `data/extracted/mines.json` after secret redaction.
