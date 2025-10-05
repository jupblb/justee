import React, { useState, useCallback } from 'react';
import { Panel } from '@enact/sandstone/Panels';
import Spottable from '@enact/spotlight/Spottable';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import POLISH_SYLLABLES, { SyllableLength } from '../data/syllables';
import css from './MainPanel.module.less';

const Container: any = (SpotlightContainerDecorator as any)({ restrict: 'self-only' })('div');
const FocusCatcher: any = Spottable('div');

interface MainPanelProps {
	[key: string]: unknown;
}

const MainPanel = (props: MainPanelProps) => {
	const [syllableLength, setSyllableLength] = useState<SyllableLength>(3);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isUppercase, setIsUppercase] = useState(true);

	const syllables = POLISH_SYLLABLES[syllableLength];

	const incLen = useCallback(() => {
		setSyllableLength(prev => Math.min(4, prev + 1) as SyllableLength);
		setCurrentIndex(0);
		return true;
	}, []);

	const decLen = useCallback(() => {
		setSyllableLength(prev => Math.max(2, prev - 1) as SyllableLength);
		setCurrentIndex(0);
		return true;
	}, []);

	const prevIdx = useCallback(() => {
		setCurrentIndex(prev => Math.max(0, prev - 1));
		return true;
	}, []);

	const nextIdx = useCallback(() => {
		setCurrentIndex(prev => Math.min(syllables.length - 1, prev + 1));
		return true;
	}, [syllables.length]);

	const toggleCase = useCallback(() => {
		setIsUppercase(prev => !prev);
		return true;
	}, []);

	const text = syllables[currentIndex] || '';
	const displaySyllable = isUppercase ? text.toUpperCase() : text;

	return (
		<Panel {...props}>
			<Container className={css.container}>
				<FocusCatcher
					autoFocus
					className={css.focusCatcher}
					role="button"
					aria-pressed={isUppercase}
					onSpotlightUp={incLen}
					onSpotlightDown={decLen}
					onSpotlightLeft={prevIdx}
					onSpotlightRight={nextIdx}
					onSpotlightSelect={toggleCase}
				/>
				<div className={css.syllable}>
					{displaySyllable}
				</div>
			</Container>
		</Panel>
	);
};

export default MainPanel;
