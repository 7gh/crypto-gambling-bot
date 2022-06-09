require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: new Intents(32767) });
const { exec } = require("child_process");

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 4040;

client.commands = new Collection();

const fs = require('fs');

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");


app.get('/', (req, res) => {
    res.send('TELgamble Terminal!')
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.post('/', (req, res) => {
    console.log(req.body);
    const reqBody = req.body;
    if(reqBody.confirmations === 0 || reqBody.confirmations === 1) client.onDeposit(reqBody);
    if(reqBody.confirmations > 1) {
        res.send('*ok*');
    } else {
        res.sendStatus(200);
    }
});

exec(`lt --port 4040 --subdomain kjdhfksldh`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

app.listen(port, () => {
  console.log(`Live on http://localhost:${port}`)
});


for(file of functions) {
    require(`./src/functions/${file}`)(client);
}


client.handleEvents(eventFiles, "./src/events");
client.handleCommands(commandFolders, "./src/commands");
client.dbLogin();
client.login(process.env.BOT_TOKEN);
