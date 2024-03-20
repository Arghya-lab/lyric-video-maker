import { AbsoluteFill, Img, staticFile } from 'remotion';

function Background() {
	return (
		<AbsoluteFill>
			<AbsoluteFill>
				<Img className="w-28 pt-5" src={staticFile('/logo.png')} />
			</AbsoluteFill>
				<Img
					className="w-full h-full"
					src={staticFile('/input-files/bg-img.jpg')}
				/>
		</AbsoluteFill>
	);
}

export default Background;
