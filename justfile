# DIY Kiosk Landing Page - Task Runner
# Usage: just <recipe>

KV_NAMESPACE_ID := "a6bc27362b9e4229b6811d7ab20484be"

# Default recipe - show available commands
default:
    @just --list

# ===== Development =====

# Install dependencies
install:
    mise x -- bun install

# Start local dev server
dev:
    mise x -- bunx astro dev

# Build for production
build:
    mise x -- bunx astro build

# Preview production build
preview:
    mise x -- bunx astro preview

# Type check
typecheck:
    mise x -- bunx astro check

# ===== KV / Email Management =====

# List all emails (for Google Play Console, comma separated)
emails:
    @mise x -- npx wrangler kv key list --namespace-id="{{KV_NAMESPACE_ID}}" --remote 2>/dev/null | jq -r '[.[].name] | join(",")'

# List all KV data (JSON)
kv-list:
    @mise x -- npx wrangler kv key list --namespace-id="{{KV_NAMESPACE_ID}}" --remote

