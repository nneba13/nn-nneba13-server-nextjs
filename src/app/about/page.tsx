
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About',
	description: 'Learn more about Nneba13.',
	robots: {
		index: false,
		follow: false
	}
};

export default function AboutPage () {
	return (
		<main className="p-4">
			<h1>Nneba13 - About</h1>
			<ul>
				<li>Version 0.1.0</li>
			</ul>
		</main>
	);
}
