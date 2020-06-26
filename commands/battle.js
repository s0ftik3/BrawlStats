const Discord = require('discord.js');
const request = require('request');
const config = require('../config.json');
const token = config.bstoken;

module.exports.run = async (bot, msg, args) =>
{

    let usage = new Discord.MessageEmbed()
        .setTitle('Wrong input')
        .setColor('BLUE')
        .setDescription('Usage: `?battle <tag>`\n\n_Note: you can use ?b instead of ?battle_')

    if(!args[0]) return msg.channel.send(usage);
    var query = args[0];

    var options = {
        'method': 'GET',
        'url': `https://api.brawlstars.com/v1/players/%23${query}/battlelog`,
        'headers': {
            'Accept': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };

    request(options, function (error, response) { 

        try {

            const modes = {
                "soloShowdown": "Showdown: Solo",
                "duoShowdown": "Showdown: Duo",
                "gemGrab": "Gem Grab",
                "bounty": "Bounty",
                "brawlBall": "Brawl Ball",
                "heist": "Heist",
                "roboRumble": "Robo Rumble",
                "bossFight": "Boss Fight",
                "bigGame": "Big Game",
                "siege": "Siege"
            }

            const results = {
                "victory": "Victory",
                "defeat": "Defeat",
                "draw": "Draw",
                "tie": "Tie"
            }

            var obj = JSON.parse(response.body);

            let battleTime = obj.items[0].battleTime;
            let year = battleTime.slice(0, 4);
            let month = battleTime.slice(4, 6);
            let day = battleTime.slice(6, 8);
            let hour = battleTime.slice(9, 11);
            let min = battleTime.slice(11, 13);
            let time = year + '-' + month + '-' + day + ' ' + hour + ':' + min;
            let mode = obj.items[0].event.mode;
            let map = obj.items[0].event.map;
            let result = obj.items[0].battle.result;
            let trophychange = obj.items[0].battle.trophyChange;
            let position = obj.items[0].battle.rank;

            let embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle(`Battle Logs [#${args[0]}] :crossed_swords:`)
                .addField('Mode :game_die:', modes[mode], true)
                .addField('Map :map:', map, true)
                .addField('Result :abacus:', results[result] || `Place - **${position}**`, true)
                .addField('Trophy Change :trophy:', `**${trophychange}**`, true)
                .addField('Time :timer:', `**${time}**`, true)
                .setFooter('Last Battle');

            msg.channel.send(embed);

        }
        catch (error)
        {

            let embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Error!')
                .setDescription('Syntax error. Please, check your tag.\n\n_Note: do not put # before your tag._')

            msg.channel.send(embed);

        }

    });

}

module.exports.help =
{
    name: 'battle',
    aliases: ['b']
};