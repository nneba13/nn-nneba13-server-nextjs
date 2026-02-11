
import { Suspense } from 'react';
// import Image from 'next/image';

import PageHeader from '@/components/structure/page-header';
import SkeletonPostGrid from '@/components/structure/skeleton-post-grid';
import SkipToContent from '@/components/navigation/nav-skip-to-content';
import WpPostList from '@/components/content/wp-posts';

//==================================================================================================

export default function Home () {
	return (
		<>
			<SkipToContent />
			<header className="relative sm:fixed sm:top-4 sm:left-4 sm:right-4 z-25">
				<PageHeader />
			</header>
			<main id="main-content" className="flex flex-col items-center justify-center min-h-screen px-4 py-24">
				<div className="mt-4">
					<Suspense fallback={<SkeletonPostGrid rows={2} />}>
						<WpPostList />
					</Suspense>
				</div>
			</main>
		</>
	);
}
