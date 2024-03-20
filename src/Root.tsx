import './style.css';
import { useCallback, useEffect, useState } from 'react';
import { Composition, continueRender, delayRender, staticFile } from 'remotion';
import { getAudioDurationInSeconds } from '@remotion/media-utils';
import { MyComposition } from './Composition';
import { fps, height, width } from './video.config';

export const RemotionRoot: React.FC = () => {
	const [handle] = useState(() => delayRender());
	const [duration, setDuration] = useState(60);

	const getDuration = useCallback(async () => {
		const songDuration = await getAudioDurationInSeconds(
			staticFile('/input-files/song.mp3')
		);
		setDuration(Math.ceil(songDuration));

		continueRender(handle);
	}, [handle]);

	useEffect(() => {
		getDuration();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={Number(fps) * duration}
				fps={fps}
				width={width}
				height={height}
			/>
		</>
	);
};
