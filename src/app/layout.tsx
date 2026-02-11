
import { ThemeModeScript } from 'flowbite-react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeInit } from '../../.flowbite-react/init';

import { getConfiguration, getEnvValue } from '@/configuration/main';
import { initFirebaseApp } from '@/services/firebase/main';

import './globals.css';

//==================================================================================================

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

// See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-object for more information.
export const metadata: Metadata = {
	title: {
		default: 'Nneba13',
		template: '%s - Nneba13'
	},
	description: 'Learn more about Nneba13.'
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<ThemeModeScript />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeInit />
				{children}
			</body>
		</html>
	);
}

//==================================================================================================

getConfiguration();
initFirebaseApp(getEnvValue('firebase'));
