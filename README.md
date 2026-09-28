# 1win Signal Bot

Telegram Mini App + web interface for **simulation signals** reconstructed from game mechanics/HAR analysis. The app intentionally does **not** claim to predict a third-party casino RNG or guarantee a betting result.

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

## Telegram
1. Copy `.env.example` to `.env.local`.
2. Set `BOT_TOKEN` from BotFather.
3. Set `NEXT_PUBLIC_APP_URL` to the HTTPS Mini App URL.
4. Optionally set `TELEGRAM_WEBHOOK_SECRET`.
5. Register webhook:
```bash
npm run telegram:set-webhook
```

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
