# Falling Pickaxe

## Sources and observations

Inspected every HTTP entry in the supplied `one-vv846123479.com.har` (458 entries) and `one-vv8461234791.com.har` (444 entries). They contain 107 and 105 Pixmove-related requests. Original localization, the game configuration module and the already reconstructed panel wrapper were also inspected.

- Game assets: `/falling_pickaxe/msov5zfgjo34q1/assets/`.
- Transport discovery: `/api/balancer/nodes/get_config`.
- Transport: `/transport/socket.io/` on the Pixmove game host. These recordings include the polling handshake, but no decoded WebSocket round messages.
- The existing panel wrapper reconstructs `rest_api/gateway`, session open, bet make/close and player balance events. Its known state fields include `seed`, `lastWinSeed`, `pickaxeId`, `pickaxeType`, `lossStreak`, `status`, `betSum`, `resultSum` and `totalWin`. These are wrapper observations, not independently verified live round responses.
- Original runtime stages include idle, spin/pickaxe selection, falling/mining and settlement when durability runs out. Loss streak reaches seven before a guaranteed pickaxe.

## Confirmed mechanics

Four pickaxes have 100 / 150 / 200 / 400 HP. An impact consumes durability. A crafting table upgrades the pickaxe and restores HP; diamond is the maximum tier. TNT destroys nearby blocks. Ore HP values are copper 5, redstone 10, gold 15, diamond 20 and emerald 30. In the captured configuration, diamond starts at depth 30 and emerald at depth 40. The field is 10 columns wide. See the sanitized facts in `data/extracted/falling-pickaxe.json`.

## Assets

Cached HAR bodies omit the main sprite sheet and background. The matching original sprite sheet and background were recovered from the user's `creative-games-studio` repository, `games/falling-pickaxe/har-assets/mt9xr4dvuunthr/assets`. Frame coordinates match the HAR atlas JSON. Only artwork and short original effects are used; no third-party runtime code, session data, credentials or balances are shipped.

## Signal implementation and limitations

The new module is an independent strategy simulation for the user's portal variant. Pickaxe count, risk modes, target exit level and a schematic route are product-defined demo parameters, not extracted RNG predictions. The original captured game has no portal: the portal is a customization from the existing panel and the Signal Bot specification. The interface explicitly labels the portal variant and simulation.

Modes produce different illustrative target ranges and mining priorities. Diamond/emerald are only prioritized at depths where the original configuration allows them. The selected pickaxe determines the displayed HP and whether the crafting-table action is upgrade or repair. Every result has a fresh ID and is saved to local history. No real game is contacted and no bets are placed.

## Unknowns

Live server seed generation, live payout validation, encrypted round payloads and the original outcome distribution cannot be established from these HAR recordings. The engine does not invent access to them or claim a winning probability.
