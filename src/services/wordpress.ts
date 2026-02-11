
import { z as zod } from 'zod';

import { resolveError } from '@/tools/error-ex';

//==================================================================================================

// https://<<domain>>/?rest_route=%2Fwp%2Fv2%2Fpost/<<post-id>>
const zWpPost = zod.object({
	id: zod.number(),
	date: zod.string(),
	date_gmt: zod.string(),
	guid: zod.object({
		rendered: zod.string()
	}),
	slug: zod.string(),
	status: zod.string(),
	type: zod.string(),
	author: zod.number(),
	comment_status: zod.string(),
	link: zod.string(),
	title: zod.object({
		rendered: zod.string()
	}),
	excerpt: zod.object({
		rendered: zod.string(),
		protected: zod.boolean()
	}),
	content: zod.object({
		rendered: zod.string(),
		protected: zod.boolean()
	}),
	links: zod.optional(zod.array(zod.object({
		href: zod.string()
	})))
});

export type tWpPost = zod.infer<typeof zWpPost>;

const ERROR_WP_POST_CONTENT_CORRUPT = 'wordpress-post-content-corrupt';

const BASE = 'https://nneba13.com/';

//==================================================================================================

export async function loadPosts (): Promise<tWpPost[] | Error> {
	try {
		const src = `${BASE}?rest_route=%2Fwp%2Fv2%2Fposts`;
		const res = await fetch(src);
		const posts = await res.json();
		if (!Array.isArray(posts)) throw Error(ERROR_WP_POST_CONTENT_CORRUPT);
		return posts.map((post) => zWpPost.parse(post));
	} catch (ex: unknown) {
		return resolveError(ex);
	}
}
