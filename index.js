const Discord = require('discord.js');
const config = require('./config.json');
const bot = new Discord.Client();
const token = config.token;
const prefix = config.prefix;
const fs = require('fs');

bot.on("ready", async () => {

    console.log(`${bot.user.username} is ready! Works on ${bot.guilds.cache.size} guild(s).`);

    bot.user.setPresence({
        activity: {
            name: `Brawl Stars | ?help`,
            type: "PLAYING",
        },
        status: 'online'
    });

    bot.generateInvite(["ADMINISTRATOR"]).then(link => { 
        console.log(link);
    });

});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {

    if (err) console.error(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) return console.log('There are no commands to load!');

    console.log(`Loading ${jsfiles.length} commands...`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props.help.name);
        });
    })

});

bot.on('message', async msg => {

    if (msg.author.bot) return;

    if (msg.guild === null) return;

    let args = msg.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    let command;

    if (!msg.content.startsWith(prefix)) return;

    if (bot.commands.has(cmd))
    {
        command = bot.commands.get(cmd);
    }
    else
    {
        command = bot.commands.get(bot.aliases.get(cmd));
    }

    command.run(bot, msg, args);

})

bot.login(token);