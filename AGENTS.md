# Agent Instructions

## Project Overview

LG WebOS TV application for learning to read Polish word fragments using Enact
framework (React-based).

**Note:** User documentation is in README.md (Polish). This file contains
developer information only.

## Tech Stack

- **Runtime**: Node.js (via Nix flake)
- **Package Manager**: pnpm
- **Framework**: Enact (React-based framework for webOS)
- **Languages**: TypeScript, HTML5, CSS/LESS
- **Tools**:
  - `@enact/cli` - Enact development CLI
  - `@webos-tools/cli` - webOS TV CLI tools
  - TypeScript compiler (integrated with Enact CLI)

## Commands

``` bash
# Install dependencies
pnpm install

# Development server (runs in browser)
pnpm run serve

# Build the app (development)
pnpm run pack

# Build the app (production)
pnpm run pack-p

# Watch mode (auto-rebuild on changes)
pnpm run watch

# Clean build artifacts
pnpm run clean

# Lint code
pnpm run lint

# Run tests
pnpm run test

# Makefile targets
make data/pl_PL.dic      # Download Polish lexicon
make syllables           # Generate syllable JSON files
make build               # Build production app (includes syllables generation)
make deploy              # Build and deploy to TV (requires LG_DEVICE env)

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

## Deploying to LG TV

### Prerequisites

- TV must have Developer Mode enabled (install from LG Content Store)
- Get passphrase from Developer Mode app on TV
- Set `LG_DEVICE` environment variable to your device name
- Run `ares-novacom --device "$LG_DEVICE" --getkey` and enter passphrase when
  prompted

### Deploy Process

``` bash
# 1. Build production app (automatically copies public/ to dist/)
pnpm run pack-p

# 2. Ensure appinfo.json exists in dist/ with:
#    - id, version, vendor, type, main, title, icon

# 3. Package app
ares-package dist/

# 4. Install to TV
ares-install com.justee.app_1.0.0_all.ipk -d "$LG_DEVICE"

# 5. Launch app
ares-launch com.justee.app -d "$LG_DEVICE"
```

### Hot Reload

No native hot reload to TV. Options:

- **Browser dev** (recommended): `pnpm run serve` has hot reload but no webOS
  APIs
- **Watch mode**: `pnpm run watch` + manual repackage/reinstall
- **Manual**: Full rebuild cycle for each TV test

## Project Structure

    src/
      App/              # Main application component (App.tsx)
      components/       # Reusable UI components
      data/             # Data files (syllables.ts - loads JSON at build time)
      types/            # TypeScript type definitions (modules.d.ts)
      views/            # Screen/panel views (MainPanel.tsx)
      index.js          # Entry point (JS for Enact compatibility)
    public/             # Static assets (copied to dist/ during build)
      appinfo.json      # App metadata (id, version, title, etc.)
      icon.png          # App icon (512x512)
    scripts/            # Build scripts
      download-lexicon.sh      # Downloads Polish dictionary
      generate-syllables.py    # Generates syllable JSON files
    data/               # Generated data (gitignored)
      pl_PL.dic         # Polish lexicon (downloaded)
      syllables-*.json  # Generated syllable files
    resources/          # Localization resources (auto-generated)
    dist/               # Build output
    Makefile            # Build automation
    tsconfig.json       # TypeScript configuration

## Dependencies

**Always use the latest stable versions of dependencies.** Check for updates
regularly and prefer `^` version ranges in package.json.

## Syllable Generation

The app uses a Python script to generate word fragments from the Polish lexicon:

1.  Downloads SJP.PL dictionary (347k+ words)
2.  Tokenizes words using grapheme-aware algorithm (recognizes `sz`, `cz`, `rz`,
    `ch`, `dzi`, `ci`, `si`, `ni`, `zi`)
3.  Extracts N-character sequences respecting grapheme boundaries
4.  Filters to Polish alphabet only (a, ą, b, c, ć, d, e, ę, f, g, h, i, j, k,
    l, ł, m, n, ń, o, ó, p, r, s, ś, t, u, w, y, z, ź, ż)
5.  Outputs JSON with occurrence counts for weighted shuffle

Generated files are in `data/` (gitignored) and bundled into the app at build
time.

## Important Notes

- This file (AGENTS.md) should be updated before each git commit
- Follow existing code style and conventions
- No comments in code unless explicitly requested or required for complex logic
- pnpm requires `.npmrc` with hoisting config for Enact compatibility
- Absolute imports are not supported without ejecting - use relative imports
- Development server runs app in browser; WebOS-specific APIs only work on TV
- Project uses TypeScript (.tsx/.ts files) with type definitions in `src/types/`
- Entry point (src/index.js) remains JavaScript for Enact compatibility
- Type safety enforced at build time via TypeScript compiler
- Use `any` type sparingly for Enact decorators with incomplete type definitions
- Syllable data JSON files are generated at build time and bundled into
  dist/main.js
