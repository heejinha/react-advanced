const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		main: "./src/main.js",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].bundle.js",
		clean: true,
	},
	resolve: {
		extensions: [ ".js", ".jsx" ],
	},
	devtool: "source-map",
	devServer: {
		static: path.resolve(__dirname, "public"),
		port: process.env.PORT,
		// historyApiFallback: false ==> /public 하위의 [path].html 리턴하고
		// historyApiFallback: true ==> [path].html 없는 경우 index.html 로 결과 응답
		historyApiFallback: true
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
};
