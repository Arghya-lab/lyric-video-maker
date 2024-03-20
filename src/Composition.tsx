import {
	AbsoluteFill,
	continueRender,
	delayRender,
	staticFile,
	Audio,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { lexendDeca } from './font';
import Background from './Background';
import LyricsContainer from './LyricsContainer';
import { useEffect, useState } from 'react';
import { lyrics } from '../public/input-files/lyrics';
import Liricle from 'liricle';
import { lyricsOffset } from './video.config';

interface LyricsTagsType {
	ar: string;
	ti: string;
	offset: number;
}

interface LyricsTimeLineType {
	time: number;
	text: string;
	words:
		| {
				time: number;
				text: string;
		  }[]
		| null;
}

interface LiricleLoadResType {
	tags: LyricsTagsType;
	lines: LyricsTimeLineType[];
	enhanced: boolean;
}

export const MyComposition = () => {
	const { fps } = useVideoConfig();
	const frame = useCurrentFrame();
	const [handle] = useState(() => delayRender());
	const [data, setData] = useState<null | LyricsTimeLineType[]>(null);

	const liricle = new Liricle();

	const loadLyrics = () =>
		liricle.load({
			text: lyrics,
		});

	useEffect(() => {
		loadLyrics();

		return () => {
			loadLyrics();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	liricle.on('load', (res: LiricleLoadResType) => {
		console.log(res);

		setData(res.lines.reverse());
		continueRender(handle);
	});

	const currentLine = data?.find((lr) => {
		/*
Need Test
		 if (lr.time - lyricsFadeInDuration * fps <= frame) {
			 Fade in opacity
			 const startingFrameOfCurrentLine = Math.floor(data[idx].time * fps);
			 opacity = interpolate(
			 	frame,
			 	[
			 		startingFrameOfCurrentLine - Math.floor(lyricsFadeInDuration * fps),
			 		startingFrameOfCurrentLine,
			 	],
			 	[0, 1]
			 );
			 opacity = Math.min(1, (frame-startingFrameOfCurrentLine/(fps* lyricsFadeInDuration)))

			 Fade out opacity
		 	if (data[idx - 1]) {
		 		const startingFrameOfNextLine = Math.floor(data[idx - 1].time * fps);
		 		opacity = interpolate(
		 			frame,
		 			[
		 				startingFrameOfNextLine - Math.floor(lyricsFadeOutDuration * fps),
		 				startingFrameOfNextLine,
		 			],
		 			[1, 0]
		 			);
		 		}
		 }
	 		console.log(opacity);

		 return (lr.time - lyricsFadeInDuration) * fps <= frame;
		 */
		return Math.ceil(lr.time * fps + (lyricsOffset * fps) / 1000) <= frame;
	})?.text;

	// const audioData = useAudioData(staticFile('/input-files/song.mp3'));
	// if (!audioData) {
	// 	return null;
	// }
	// const visualization = visualizeAudio({
	// 	fps,
	// 	frame,
	// 	audioData,
	// 	numberOfSamples: 16,
	// }); // [0.22, 0.1, 0.01, 0.01, 0.01, 0.02, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

	return (
		<AbsoluteFill
			style={{
				fontFamily: lexendDeca,
			}}
		>
			<Audio src={staticFile('/input-files/song.mp3')} />
			<Background />
			<LyricsContainer line={currentLine} />
		</AbsoluteFill>
	);
};
