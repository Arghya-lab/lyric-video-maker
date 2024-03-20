import { AbsoluteFill } from 'remotion';

function LyricsContainer({
	line,
	opacity,
}: {
	line?: string;
	opacity?: number;
}) {
	if (!line) return null;

	return (
		<AbsoluteFill className="justify-center items-center">
			<p
				className="text-7xl text-slate-50 px-80 text-wrap text-center leading-snug"
				style={{
					textShadow: '6px 6px 8px rgba(0, 0, 0, 0.65)',
					opacity: opacity || 1,
				}}
			>
				{line}
			</p>
		</AbsoluteFill>
	);
}

export default LyricsContainer;
