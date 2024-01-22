import type { ReactNode } from "react";
import NavBar from "../components/navbar";
import { orbitron } from "./fonts";
import "./globals.css";

interface LayoutProps {
	children: ReactNode;
}
const RootLayout = ({ children }: LayoutProps) => {
	return (
		<html
			lang="en"
			className={orbitron.variable}
		>
			<body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen">
				<header>
					<NavBar />
				</header>
				<main className="py-3 grow">{children}</main>
				<footer className="border-t py-3 text-center text-xs">
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
