
import SkipToContent from '@/components/navigation/nav-skip-to-content';

//==================================================================================================

export default function PageBlank () {
	return (
		<>
			<SkipToContent />
			<main id="main-content" className="flex flex-col items-center justify-center min-h-screen px-4 py-24">
			</main>
		</>
	);
}
