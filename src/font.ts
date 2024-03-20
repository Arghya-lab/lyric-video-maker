import * as LexendDeca from '@remotion/google-fonts/LexendDeca';
import * as KumbhSans from '@remotion/google-fonts/KumbhSans';

const { fontFamily: lexendDeca } = LexendDeca.loadFont('normal', {
	weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});
const { fontFamily: kumbhSans } = KumbhSans.loadFont('normal', {
	weights: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});

export { lexendDeca, kumbhSans };
