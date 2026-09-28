# 1win Signal Bot

Telegram Mini App + web interface for **simulation signals** reconstructed from game mechanics/HAR analysis. The app intentionally does **not** claim to predict a third-party casino RNG or guarantee a betting result.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDaniel23412%2Fbots&project-name=bots&repository-name=bots)

## Stage 1 implemented
- Next.js App Router + TypeScript + Tailwind
- Telegram Mini App bridge
- Telegram `/start` webhook with `🚀 ОТКРЫТЬ SIGNAL BOT`
- Central Game Registry / SignalProvider architecture
- Mines signal engine (5×5, 1/3/5/7 mines)
- Tower Rush signal engine (safe/balanced/aggressive)
- animated AI analysis flow
- 5-second cooldown
- client signal history
- HAR parser + secret redaction + auto game detection
- hidden admin/debug API and game debug pages
- Prisma/PostgreSQL schema prepared for server-side history/config
- RU/EN/ES/ID locale dictionaries prepared

## Install
```bash
npm install
```

## Development
```bash
npm run dev
```

## HAR parser
```bash
npm run parse:har -- ./har/game.har
```

The parser extracts request URLs, methods, safe headers, query params, payloads, JSON responses, WebSocket messages, game/round IDs, multipliers and asset URLs. Sensitive headers/keys are redacted before normalized JSON is written.

## Typecheck / Build
```bash
npm run typecheck
npm run build
```

## Vercel
The production app can be deployed directly from this repository with the **Deploy with Vercel** button above.

The production Telegram webhook route does not require `BOT_TOKEN` or `NEXT_PUBLIC_APP_URL` in Vercel. It derives the Mini App origin from the incoming webhook request and answers Telegram directly in the webhook response.

Optional production variables:
- `TELEGRAM_WEBHOOK_SECRET`
- `DATABASE_URL`
- `ADMIN_SECRET`
- `SIGNAL_COOLDOWN_SECONDS`

## Telegram
For local/manual webhook registration, set:
- `BOT_TOKEN`
- `NEXT_PUBLIC_APP_URL`

Then run:
```bash
npm run telegram:set-webhook
```

In production the bot token is only needed once to register the final Vercel webhook URL with Telegram; it does not need to be committed or stored in the Vercel project.

## Architecture
```text
HAR
 ↓
Parser
 ↓
Normalized Game Data
 ↓
Game Engine
 ↓
Signal Engine / Registry
 ↓
API
 ↓
Telegram Mini App / Web UI
```

Each game is isolated under `games/<slug>/`. To add a game, add its config/parser/engine and register it once in `lib/signals/registry.ts`.

## Next games
Falling Pickaxe → Viper Royale → Wheel Out → Aviamasters → Chicken Rush → Tower Dash → Totem Tower.
