import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// TODO fix fonts
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

// TODO fix fonts
const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "KeyPhonic",
	description: "Online Keyboard and headphone shop",
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en">
			<body
			cz-shortcut-listen="true"
			// TODO fix fonts
			// className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
