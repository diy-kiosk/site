# DIY Kiosk Landing Page - Task Runner
# Usage: just <recipe>

# Default recipe - show available commands
default:
    @just --list

# ===== Development =====

# Start local dev server
dev:
    mise x -- bunx serve -p 3000

