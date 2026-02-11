
import { loadPosts } from '@/services/wordpress';

//==================================================================================================

const ERROR_WP_LOAD_POST_FAILURE = 'wordpress-load-post-failure';

//==================================================================================================

export default async function WpPostList () {
	const postList = await loadPosts();
	if (postList instanceof Error) {
		console.error(ERROR_WP_LOAD_POST_FAILURE);
		console.error(postList);
		return (
			<div className="uppercase" role="log">Posts unavailable</div>
		);
	}

	const components = postList.map(function (post, index) {
		return (
			<a key={`wp-post|${index + 1}`} className="block max-w-sm p-6 border rounded-base shadow-xs hover:bg-neutral-secondary-medium" href={post.guid.rendered} target="__blank">
				<h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">{post.title.rendered}</h5>
				<p className="text-body" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered || 'No description available.' }} />
			</a>
		);
	});

	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-4 bottom-start gap-4">
			{ components }
		</div>
	);
}
