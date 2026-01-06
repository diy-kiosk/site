# DIY Kiosk Landing Page - Task Runner
# Usage: just <recipe>

KV_NAMESPACE_ID := "a6bc27362b9e4229b6811d7ab20484be"

# Default recipe - show available commands
default:
    @just --list

# ===== Development =====

# Start local dev server
dev:
    mise x -- bunx serve -p 3000

# ===== KV / Email Management =====

# List all emails (for Google Play Console, comma separated)
emails:
    @mise x -- npx wrangler kv key list --namespace-id="{{KV_NAMESPACE_ID}}" --remote 2>/dev/null | jq -r '[.[].name] | join(",")'

# List all KV data (JSON)
kv-list:
    @mise x -- npx wrangler kv key list --namespace-id="{{KV_NAMESPACE_ID}}" --remote

