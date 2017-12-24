
const profile = require('./profile.js');

const users = process.argv.slice(2);

users.forEach(userName => {
	profile.get(userName);
});

// Run Console Log : node app.js sandippal chalkers alenaholligan