// webpack.config.js
import { fileURLToPath } from 'url';
import path from 'path';

/** Поддержка __dirname в ES-модулях */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	mode: 'production',
	target: 'node',
	entry: './index.js', // твоя точка входа
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, '../dist'),
	},
	experiments: {
		outputModule: true,
	},
	externalsType: 'module',
	resolve: {
		extensions: ['.js'],
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				type: 'javascript/auto',
				resolve: {
					fullySpecified: false,
				},
			},
		],
	},
};