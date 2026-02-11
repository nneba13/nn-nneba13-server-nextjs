
import { type ReactNode } from 'react';

import PageHeader from '@/components/structure/page-header';
import SkipToContent from '@/components/navigation/nav-skip-to-content';

//==================================================================================================

type tPageCommonParams = {
	children?: ReactNode;
};

export default function PageBlank ({ children }: tPageCommonParams) {
	return (
		<>
			<SkipToContent />
			<header className="relative sm:fixed sm:top-4 sm:left-4 sm:right-4 z-25">
				<PageHeader />
			</header>
			<main id="main-content" className="flex flex-col items-center justify-center min-h-screen px-4 py-24">
				{ children }
			</main>
		</>
	);
}
