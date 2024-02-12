const toRemotePattern = (urlString) => {
	const url = new URL(urlString);
	return {
		protocol: url.protocol.replace(":", ""),
		hostname: url.hostname,
		port: url.port,
		pathname: url.pathname,
	};
};

/** @type {import ('next').NextConfig} */
module.exports = {
	//output: "export",
	images: {
		// unoptimized: true, use if you want to use static images with output

		remotePatterns: [toRemotePattern(process.env.CMS_IMAGE_PATTERN)],
	},
};
