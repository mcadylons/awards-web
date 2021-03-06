const path = require('path');
// const fs = require('fs');

const port = process.env.PORT || 4567;

module.exports = {
	// Server location
	host: `http://localhost${this.port === 80 ? '' : `:${port}`}`, // TODO wat
	port,
	// Directory where the compiled frontend goes
	publicDir: path.join(__dirname, 'public'),
	// SQLite database information
	db: {
		path: __dirname,
		filename: 'somedatabase.db',
	},
	// Session management options
	session: {
		secret: 'Some secret value', // Secret for cookies
		table: 'sessions', // The table where session info is stored
	},
	// Reddit OAuth credentials
	reddit: {
		clientId: 'Reddit application client ID',
		clientSecret: 'Reddit application client secret',
		userAgent: 'web:geo1088/animeawards-mkii:0.0.1 (by /u/YOURNAMEGOESHERE)',
	},
	// Discord credentials and logging channels
	discord: {
		token: 'Token here',
		auditChannel: 'Channel ID for logging website actions',
		complaintsChannel: 'Channel ID for allocation complaints here',
		feedbackChannel: 'Channel ID for feedback directed at /r/anime mods',
	},
	// Un-comment this in production to enable HTTPS support
	// https: {
	// 	port: 443,
	// 	key: fs.readFileSync('/etc/letsencrypt/path/to/key.pem'),
	// 	cert: fs.readFileSync('/etc/letsencrypt/path/to/cert.pem'),
	// },
};
