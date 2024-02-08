/** @type {import ('next').NextConfig} */
module.exports = {
	//output: "export",
	images: {
		// unoptimized: true, use if you want to use static images with output

		remotePatterns: [
			{
				protocol: "http",
				hostname: "localhost",
				port: "1337",
				pathname: "/uploads/**",
			},
		],
	},
};
