const keepAlive = require("./server")
const express = require('express')
const app = express();
const port = 3000
const dotenv = require('dotenv');
const TOKEN = (process.env.TOKEN);
const { Client } = require('discord.js-selfbot-v11')
const client = new Client();
const discord = require('discord.js-selfbot-v11');
const fs = require('fs');

const client = new discord.Client();
const keepAlive = require('./server.js');
const config = require('./config.json');

const events = fs.readdirSync('./events/');
events.forEach(file => {
	const eventname = file.split('.')[0];
	const event = require(`./events/${file}`);
	client.on(eventname, event.bind(null, client));
});

app.get('/', (req, res) => res.send('Please connect me into a hosting'))

app.listen(port, () =>
console.log(`Creator: Kenzie-XD`)
);
const request = require("request");
const config = require("./config.json");
const STATUS_URL = "https://discordapp.com/api/v8/users/@me/settings";

async function loop() {
	for (let anim of config.animation) {
		await doRequest(anim.text, anim.emojiID, anim.emojiName).catch(console.error);
		await new Promise(p => setTimeout(p, anim.timeout));
	}

	loop();
}
console.log("Running...");
loop();

function doRequest(text, emojiID = null, emojiName = null) {
	return new Promise((resolve, reject) => {
		request({
			method: "PATCH",
			uri: STATUS_URL,
			headers: {
				Authorization: process.env.TOKEN
			},
			json: {
				custom_status: {
					text: text,
					emoji_id: emojiID,
					emoji_name: emojiName
				}
			}
		}, (err, res, body) => {
			if (err) {
				reject(err);
				return;
			}

			if (res.statusCode !== 200) {
				reject(new Error("Invalid Status Code: " + res.statusCode));
				return;
			}

			resolve(true);
		});
	});
}

client.on('ready', () => { 
   console.log(`Log in success!\nEnabled online forever on ${client.user.username}`)
})


keepAlive();
client.login(process.env.TOKEN);
