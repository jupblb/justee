# Agent Instructions

## Project Overview

LG WebOS TV application using Enact framework (React-based).

## Tech Stack

- **Runtime**: Node.js (via Nix flake)
- **Package Manager**: pnpm
- **Framework**: Enact (React-based framework for webOS)
- **Languages**: JavaScript, HTML5, CSS
- **Tools**:
  - `@enact/cli` - Enact development CLI
  - `@webos-tools/cli` - webOS TV CLI tools

## Commands

``` bash
# Install dependencies
pnpm install

# Create new Enact app (if not already created)
npx enact create -t webostv .

# Build the app
npx enact pack

# WebOS CLI commands (use npx or pnpm)
npx ares-setup-device    # Configure target device
npx ares-install         # Install app on device
npx ares-launch          # Launch app on device
npx ares-package         # Package app for distribution
```

## Development Workflow

1.  Enter Nix development shell: `nix develop`
2.  Install dependencies: `pnpm install`
3.  Develop using Enact CLI tools
4.  Update AGENTS.md before each git commit

## Dependencies

**Always use the latest stable versions of dependencies.** Check for updates
regularly and prefer `^` version ranges in package.json.

## Important Notes

- This file (AGENTS.md) should be updated before each git commit
- Follow existing code style and conventions
- No comments in code unless explicitly requested or required for complex logic
