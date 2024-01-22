import type { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => {
	return <h1 className="font-bold font-orbitron pb-3 text-2xl">{children}</h1>;
};
export default Heading;
