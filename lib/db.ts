import { PrismaClient } from "@prisma/client";
//  export const db = new PrismaClient({
// // 	//log: [{ emit: "stdout", level: "query" }],
// });
declare global {
	var prismaClient: PrismaClient | undefined;
}
const createPrismaClient = (): PrismaClient => {
	if (!globalThis.prismaClient) {
		globalThis.prismaClient = new PrismaClient({});
	}
	return globalThis.prismaClient;
};

export const db = createPrismaClient();
