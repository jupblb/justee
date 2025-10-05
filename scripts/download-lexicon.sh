#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DATA_DIR="$PROJECT_ROOT/data"

echo "Downloading latest Polish lexicon from sjp.pl..."

# Fetch the download page and extract the myspell download link
DOWNLOAD_URL=$(curl -sL https://sjp.pl/slownik/en/ |
  grep -oE 'href="[^"]*sjp-myspell-pl-[0-9]{8}\.zip"' |
  head -1 |
  sed 's/href="//' |
  sed 's/"//')

if [ -z "$DOWNLOAD_URL" ]; then
  echo "Error: Could not find myspell download link"
  exit 1
fi

# Make it absolute if it's relative
if [[ ! "$DOWNLOAD_URL" =~ ^https?:// ]]; then
  DOWNLOAD_URL="https://sjp.pl$DOWNLOAD_URL"
fi

FILENAME=$(basename "$DOWNLOAD_URL")
echo "Found: $FILENAME"

# Create data directory if it doesn't exist
mkdir -p "$DATA_DIR"

# Download the file
echo "Downloading $DOWNLOAD_URL..."
curl -L "$DOWNLOAD_URL" -o "$DATA_DIR/$FILENAME"

# Extract the outer zip
echo "Extracting $FILENAME..."
unzip -o "$DATA_DIR/$FILENAME" -d "$DATA_DIR/temp_extract"

# Extract the inner pl_PL.zip
echo "Extracting pl_PL.zip..."
unzip -o "$DATA_DIR/temp_extract/pl_PL.zip" -d "$DATA_DIR"

# Clean up
rm -rf "$DATA_DIR/temp_extract"
rm "$DATA_DIR/$FILENAME"
rm -f "$DATA_DIR/pl_PL.zip" "$DATA_DIR/spell.txt" "$DATA_DIR/pl_PL.aff" "$DATA_DIR/README_pl_PL.txt"

echo "✓ Lexicon extracted to $DATA_DIR/pl_PL.dic"
