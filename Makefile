.PHONY: build deploy syllables

data/pl_PL.dic:
	@echo "Downloading Polish lexicon..."
	@./scripts/download-lexicon.sh

syllables: data/pl_PL.dic data/syllables-2.json data/syllables-3.json data/syllables-4.json

data/syllables-2.json: data/pl_PL.dic scripts/generate-syllables.py
	@echo "Generating 2-character syllables..."
	@python scripts/generate-syllables.py 2

data/syllables-3.json: data/pl_PL.dic scripts/generate-syllables.py
	@echo "Generating 3-character syllables..."
	@python scripts/generate-syllables.py 3

data/syllables-4.json: data/pl_PL.dic scripts/generate-syllables.py
	@echo "Generating 4-character syllables..."
	@python scripts/generate-syllables.py 4

build: syllables
	pnpm run pack-p

deploy: build
	@if [ -z "$$LG_DEVICE" ]; then \
		echo "Error: LG_DEVICE environment variable not set"; \
		exit 1; \
	fi
	@echo "Packaging app..."
	@ares-package dist/
	@echo "Installing to TV ($$LG_DEVICE)..."
	@ares-install com.justee.app_0.0.1_all.ipk -d "$$LG_DEVICE"
	@echo "Launching app..."
	@ares-launch com.justee.app -d "$$LG_DEVICE"
