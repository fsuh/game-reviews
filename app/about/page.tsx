import { Metadata } from "next";
import Heading from "@/components/Heading";
export const metadata: Metadata = {
	title: "About",
};

const AboutPage = () => {
	return (
		<>
			<Heading>About Us</Heading>
			<p>This is the about page</p>
		</>
	);
};
export default AboutPage;
