# Original game artwork

Assets in this directory come from the game HAR recordings supplied for this project. No HAR payloads, session headers, credentials or third-party game runtime code are shipped.

- `mines`: Cave Mines original tile, crystal and bomb SVG paths; original animated torch SVGs, ground WebP and Inter fonts. The tile/crystal/bomb SVGs were rendered from their isolated original vector component module without altering paths or gradients.
- `tower-rush`: Tower Rush v108 mobile assets and Rubik fonts. Original atlas `images/towerrush/global/beforeLoad/global.webp` is displayed using the frame coordinates from its matching JSON. Backgrounds, base, logo and button texture use the `onewin_axis` mobile skin where applicable. Cached image bodies absent from the HAR were retrieved from the exact asset URLs recorded in it.

These assets reproduce the game visuals. Signal generation remains the existing independent demonstration simulation; it is not connected to live casino rounds or predictive RNG data.
