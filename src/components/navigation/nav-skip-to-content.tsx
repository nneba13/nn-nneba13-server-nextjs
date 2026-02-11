
import Link from 'next/link';

//==================================================================================================

export default function SkipToContent () {
	return (
		<Link
			className="sr-only"
			href="#main-content"
			aria-label="Skip to main content"
		>
			Skip to main content
		</Link>
	);
}
