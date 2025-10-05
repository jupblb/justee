#!/usr/bin/env python3
"""
Generate Polish syllables of specified length by extracting from lexicon.
Uses pyphen for linguistic syllabification.
Usage: python generate-syllables.py <length>
"""

import sys
import json
from pathlib import Path
from collections import Counter
import pyphen

# Polish alphabet
POLISH_ALPHABET = set("aąbcćdeęfghijklłmnńoóprsśtuwyzźż")


def syllabify_word(word, pyphen_dict):
    """Syllabify word using pyphen and return list of syllables."""
    syllabified = pyphen_dict.inserted(word, hyphen="-")
    return syllabified.split("-")


def load_lexicon(lexicon_path):
    """Load Polish lexicon and strip affix flags."""
    words = []
    with open(lexicon_path, "r", encoding="iso-8859-2") as f:
        next(f)  # Skip the first line (count)
        for line in f:
            word = line.strip().split("/")[0].lower()
            if word:
                words.append(word)
    return words


def is_polish_only(text):
    """Check if text contains only Polish alphabet characters."""
    return all(c in POLISH_ALPHABET for c in text)


def generate_syllables(length, lexicon):
    """Generate all syllables of given character length from lexicon."""
    print(f"Extracting {length}-character syllables from lexicon using pyphen...")

    pyphen_dict = pyphen.Pyphen(lang="pl_PL")
    syllable_counter = Counter()
    processed = 0
    total = len(lexicon)

    for word in lexicon:
        processed += 1

        if processed % 50000 == 0:
            print(
                f"  Processed {processed:,}/{total:,} words ({100 * processed / total:.1f}%)"
            )

        syllables = syllabify_word(word, pyphen_dict)

        for syllable in syllables:
            if len(syllable) == length and is_polish_only(syllable):
                syllable_counter[syllable] += 1

    # Convert to list with occurrences, sorted by frequency
    valid_syllables = [
        {"text": syllable, "occurrences": count}
        for syllable, count in syllable_counter.items()
    ]
    valid_syllables.sort(key=lambda x: x["occurrences"], reverse=True)

    return valid_syllables


def main():
    if len(sys.argv) != 2:
        print("Usage: python generate-syllables.py <length>")
        print("  length: syllable character length (2, 3, or 4)")
        sys.exit(1)

    try:
        length = int(sys.argv[1])
        if length not in [2, 3, 4]:
            raise ValueError
    except ValueError:
        print("Error: length must be 2, 3, or 4")
        sys.exit(1)

    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    lexicon_path = project_root / "data" / "pl_PL.dic"
    output_path = project_root / "data" / f"syllables-{length}.json"

    if not lexicon_path.exists():
        print(f"Error: Lexicon not found at {lexicon_path}")
        print("Run: make data/pl_PL.dic")
        sys.exit(1)

    print(f"Loading lexicon from {lexicon_path}...")
    lexicon = load_lexicon(lexicon_path)
    print(f"Loaded {len(lexicon):,} words")

    valid_syllables = generate_syllables(length, lexicon)

    print(f"\nFound {len(valid_syllables):,} unique syllables of {length} characters")
    print(f"Writing to {output_path}...")

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(valid_syllables, f, ensure_ascii=False, indent=2)

    print("✓ Done! Top 10 by frequency:")
    for syl in valid_syllables[:10]:
        print(f"  {syl['text']:5s} - {syl['occurrences']:,} occurrences")


if __name__ == "__main__":
    main()
