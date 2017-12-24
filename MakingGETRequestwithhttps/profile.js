const http = require('http');
const https = require('https');
const userName = 'sandippal';

function printMessage(name, badgeCount, points) {
	const message = `${name} has ${badgeCount} total badges and ${points} points in Javascript`;
	console.log(message);
}

// printMessage('sandip', 432, 23232934923);
function printError(error) {
	console.error(error.message);
}

const get = (userName) => {
	try {
		const request = https.get(`https://teamtreehouse.com/${userName}.json`, response => {
			if (response.statusCode === 200) {
				let body = "";
				// console.dir(response.statusCode);

				response.on('data', data => {
					// console.log('data', data.toString());
					body += data.toString();
				});

				response.on('end', () => {
					try {
						// console.log(typeof body);
						const profile = JSON.parse(body);
						// console.log(profile);
						printMessage(userName, profile.badges.length, profile.points.JavaScript);
					} catch(error) {
						printError(error);
					}
				});
			} else {
				const message = 
				`There was an error getting the profile for ${userName} (${http.STATUS_CODES[response.statusCode]})`;
				const statusCodeError = new Error(message);
				printError(statusCodeError);
			}
		});

		request.on('error', printError);
	} catch(error) {
		printError(error);
	}
}

// console.log(process.argv);
// const users = ['chalkers', 'alenaholligan'];

module.exports.get = get;
