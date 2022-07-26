const keepAlive = require("./server")
const dotenv = require('dotenv');
const TOKEN = (process.env.TOKEN);
const { Client } = require('discord.js-selfbot-v11')
const client = new Client();

client.on('ready', () => { 
   console.log(`Log in success!\nEnabled online forever on ${client.user.username}`)
})

keepAlive()
client.login(TOKEN);
