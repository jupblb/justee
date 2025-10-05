import React, { useState, useCallback, useEffect, useRef } from 'react';
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
	const [isDimming, setIsDimming] = useState(false);
	const dimTimerRef = useRef<NodeJS.Timeout | null>(null);

	const syllables = POLISH_SYLLABLES[syllableLength];

	const resetTimer = useCallback(() => {
		if (dimTimerRef.current) {
			clearTimeout(dimTimerRef.current);
		}
		setIsDimming(false);

		dimTimerRef.current = setTimeout(() => {
			setIsDimming(true);
		}, 60000);
	}, []);

	useEffect(() => {
		resetTimer();
		return () => {
			if (dimTimerRef.current) {
				clearTimeout(dimTimerRef.current);
			}
		};
	}, [resetTimer]);

	const incLen = useCallback(() => {
		setSyllableLength(prev => Math.min(4, prev + 1) as SyllableLength);
		setCurrentIndex(0);
		resetTimer();
		return true;
	}, [resetTimer]);

	const decLen = useCallback(() => {
		setSyllableLength(prev => Math.max(2, prev - 1) as SyllableLength);
		setCurrentIndex(0);
		resetTimer();
		return true;
	}, [resetTimer]);

	const prevIdx = useCallback(() => {
		setCurrentIndex(prev => Math.max(0, prev - 1));
		resetTimer();
		return true;
	}, [resetTimer]);

	const nextIdx = useCallback(() => {
		setCurrentIndex(prev => Math.min(syllables.length - 1, prev + 1));
		resetTimer();
		return true;
	}, [syllables.length, resetTimer]);

	const toggleCase = useCallback(() => {
		setIsUppercase(prev => !prev);
		resetTimer();
		return true;
	}, [resetTimer]);

	const text = syllables[currentIndex] || '';
	const displaySyllable = isUppercase ? text.toUpperCase() : text;

	return (
		<Panel {...props}>
			<Container className={`${css.container} ${isDimming ? css.dimming : ''}`}>
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
