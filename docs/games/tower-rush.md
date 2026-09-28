# Tower Rush

## Source project observation
The existing `creative-games-studio` Tower Rush runtime seeds HAR-compatible state before the launcher boots. Observed fields include `gameInfo`, `possibleWin`, `floorsInfo`, `nextFloorType`, `bet`, `gameResult`, partner configuration and balance.

## Signal implementation
Modes map to a simulated stopping range:
- safe: 2–3 floors
- balanced: 3–5 floors
- aggressive: 5–7 floors

The final row is shown as `STOP`. This is a strategy simulation, not a prediction of a live round.

## HAR
Run `npm run parse:har -- ./har/tower-rush.har`. The normalized file is written to `data/extracted/tower-rush.json` after secret redaction.
