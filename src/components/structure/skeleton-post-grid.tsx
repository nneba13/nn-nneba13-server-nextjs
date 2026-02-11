"use client";

import { isBrowserContext } from '@/tools/browser-ex';

//==================================================================================================

type tSkeletonPostGridAttributes = {
	cols?: number;
	rows?: number;
};

export default function SkeletonPostGrid ({ cols = 0, rows = 0 }: tSkeletonPostGridAttributes = {}) {
	if (isBrowserContext() && cols < 1 || rows < 1) {
		const viewWidth = document.body.clientWidth;
		if (viewWidth > 1024) cols = 3;
		else if (viewWidth > 640) cols = 2;
		else cols = 1;
	}

	cols = Math.max(cols, 1);
	rows = Math.max(rows, 1);

	const grid = [];

	for (let ji = 0; ji < rows; ji++) {
		const row = [];

		for (let ii = 0; ii < cols; ii++) {
			row.push(
				<div key={`skeleton|${ii + 1}/${ji + 1}`} className="flex items-center justify-center w-80 h-60 bg-(--common-reserved-background) rounded animate-pulse">
					<span className="sr-only">Loading...</span>
				</div>
			);
		}

		grid.push((<div key={`skeleton|${ji + 1}`} className="flex flex-row gap-4">{row}</div>));
	}

	return (
		<div role="status">{grid}</div>
	);
}
