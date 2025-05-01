// webpack.config.js
import { fileURLToPath } from 'url';
import path from 'path';

/** Поддержка __dirname в ES-модулях */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configOld = {
	mode: 'production',
	target: 'node',
	entry: './index.js', // твоя точка входа
	output: {
		filename: 'app-old.js',
		path: path.resolve(__dirname, '../dist'),
	},
	optimization: {
		minimize: false,  // Отключаем минимизацию
	},

	devtool: false,  // Отключаем source maps, чтобы избежать использования eval

	module: {
		rules: [],
	},
}

const config =  {
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

export default [configOld, config]