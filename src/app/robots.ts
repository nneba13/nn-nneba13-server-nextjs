
import { MetadataRoute } from 'next';

//==================================================================================================

// See https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots for more information.
export default function robots () {
	return {
		rules: [
			{
				userAgent: '*',
				disallow: '/'
			}
		],
		sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
	} as MetadataRoute.Robots;
}
