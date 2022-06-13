const path = require('path');
module.exports = {
	// ...existing code
	webpack: {
		configure: {
			resolve: {
				alias: {
					'@': path.resolve(__dirname, 'src/components'),
				},
			},
		},
	},
};
