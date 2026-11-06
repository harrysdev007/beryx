# BERYX operations

Website: https://beryx.online. X: https://x.com/beryx_bnb.

## Run

Node 22: `npm ci`, copy `.env.example` to `.env`, then `npm run dev -- --port 5184`. Production: `npm run build` then `npm start`. Set PORT if needed and HOST=0.0.0.0 only behind an appropriate hosting proxy. Vercel serverless adapter and SPA rewrites are included. Deploy the whole repo; static-only hosting cannot execute tools/agents.

## OpenRouter

Set OPENROUTER_API_KEY on the server, never with a VITE_ prefix. Optional OPENROUTER_MODEL defaults to openrouter/auto. Restart after changing local env. Provider billing applies. Without the key the app shows setup required, while direct tools and MCP remain available. Live AI inference was not tested because no key was supplied; orchestration was tested using mock responses.

## Implemented

Agent creation/editing with per-agent tool allowlists; local history, import/export. OpenRouter tool-calling loop (max five rounds, six tool calls per round), trace, latency and token usage. Twelve read-only tools: search, token market pairs, BNB price, native balance, explicit-token balance, explicit token/owner/spender allowance, GoPlus risk indicators, transaction/receipt/transfer logs, bytecode/ERC20 metadata, chain status, model catalog and routing candidates. Browser wallet connection requests accounts only.

## MCP

Streamable HTTP JSON-RPC `/api/mcp` supports initialization, tools and three prompts. Protocol 2025-06-18; GET returns 405 since SSE is not used. Stdio: `npm run mcp`. Local HTTP example: `claude mcp add --transport http beryx http://127.0.0.1:5184/api/mcp`. For external deployment set MCP_KEY and pass Authorization: Bearer YOUR_KEY. Optional ALLOWED_ORIGINS is comma-separated. Private Sites hosting also requires platform access.

## Sources and limits

DEX Screener, BNB public RPC with fallback, GoPlus and OpenRouter. Reads return source/time. Missing flags mean unknown, not safe. Allowance checks do not discover every approval; token balance reads do not enumerate all assets. Transfer logs report raw token units unless decimals are separately read. No launch integration, full historical PnL, autonomous trading, holder gate, project token or security guarantee.

Rate limits are process-local: 10 AI runs and 120 direct/MCP calls/hour per caller. Production multi-instance deployment needs durable rate limiting and authenticated AI usage; counters reset on cold starts. Configure provider-side spend caps. No global spend cap is enforced by this server.

## Checks

`npm test` covers input validation, MCP discovery/errors/auth/origins, secret redaction and the model tool loop. `npm run build` creates the client bundle. Live token search, BNB price, chain status and GoPlus reads checked successfully. Browser visual QA unavailable.

## Art

Selected gold logo: brand/beryx-logo-gold.png. Banner: brand/beryx-banner-3x1.png. Built-in Imagegen prompt: reinterpret the supplied sculptural triangular mark as a rounded architectural gold BNB-style prism, charcoal/amber inset and dark studio background, no character or words. Banner: same logo centred, exact beryx.online text to the right, 3:1 canvas.
