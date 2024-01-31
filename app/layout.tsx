import type { ReactNode } from "react";
import type { Metadata } from "next";
import NavBar from "../components/navbar";
import { orbitron, exo2 } from "./fonts";
import "./globals.css";

interface LayoutProps {
	children: ReactNode;
}

export const metadata: Metadata = {
	title: {
		default: "Indie Gamer",
		template: "%s | Indie Gamer",
	},
};

const RootLayout = ({ children }: LayoutProps) => {
	return (
		<html
			lang="en"
			className={`${exo2.variable} ${orbitron.variable}`}
		>
			<body
				className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen"
				suppressHydrationWarning={true}
			>
				<header>
					<NavBar />
				</header>
				<main className="py-3 grow">{children}</main>
				<footer className="border-t py-3 text-center text-slate-500 text-xs">
					Game data and images courtesy of{" "}
					<a
						href="https://rawg.io/"
						target="_blank"
						rel="noreferrer"
						className="text-orange-800 hover:underline"
					>
						RAWG
					</a>
				</footer>
			</body>
		</html>
	);
};
export default RootLayout;
