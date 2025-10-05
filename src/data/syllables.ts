import syllables2 from '../../data/syllables-2.json';
import syllables3 from '../../data/syllables-3.json';
import syllables4 from '../../data/syllables-4.json';

type SyllableEntry = {
	text: string;
	occurrences: number;
};

const weightedShuffle = (syllables: SyllableEntry[]): string[] => {
	return syllables
		.map((s) => ({
			text: s.text,
			score: Math.random() * Math.log(s.occurrences + 1)
		}))
		.sort((a, b) => b.score - a.score)
		.map((s) => s.text);
};

export type SyllableLength = 2 | 3 | 4;

export type PolishSyllables = {
	[K in SyllableLength]: string[];
};

const POLISH_SYLLABLES: PolishSyllables = {
	2: weightedShuffle(syllables2),
	3: weightedShuffle(syllables3),
	4: weightedShuffle(syllables4)
};

export default POLISH_SYLLABLES;
