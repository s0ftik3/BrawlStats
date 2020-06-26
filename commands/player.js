const Discord = require('discord.js');
const request = require('request');
const config = require('../config.json');
const token = config.bstoken;

module.exports.run = async (bot, msg, args) =>
{

    let usage = new Discord.MessageEmbed()
        .setTitle('Wrong input')
        .setColor('BLUE')
        .setDescription('Usage: `?player <tag>`\n\n_Note: you can use ?p instead of ?player_')

    if(!args[0]) return msg.channel.send(usage);
    var query = args[0];

    var options = {
        'method': 'GET',
        'url': `https://api.brawlstars.com/v1/players/%23${query}`,
        'headers': {
            'Accept': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };

    request(options, function (error, response) { 

        try {

            var obj = JSON.parse(response.body);

            let tag = query;
            let name = obj.name;
            let trophies = obj.trophies;
            let higest = obj.highestTrophies;
            let level = obj.expLevel;
            let three = obj["3vs3Victories"];
            let duo = obj.duoVictories;
            let solo = obj.soloVictories;
            let robobest = obj.bestRoboRumbleTime;
            let bigbest = obj.bestTimeAsBigBrawler;
            let club = obj.club.name;
            let clubtag = obj.club.tag;
            let brawlers = obj.brawlers.length;

            let embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle(`Player Stats [#${tag}] :chart_with_upwards_trend:`)
                .addField('Nickname :page_facing_up: ', name + ' ' + `(**${level}** lvl)`, true)
                .addField('Trophies :trophy:',`**${trophies}**`, true)
                .addField('Highest Trophies :fire:', `**${higest}**`, true)
                .addField('Solo :first_place: ', `**${solo}**`, true)
                .addField('Duo :second_place:', `**${duo}**`, true)
                .addField('3 vs 3 :third_place:', `**${three}**`, true)
                .addField('Robo Rumble :robot:', `**${robobest}**m`, true)
                .addField('Big Brawler :space_invader:', `**${bigbest}**m`, true)
                .addField('Brawlers :performing_arts: ', `**${brawlers}** of **37**`, true)
                .setFooter(`Club: ${club ? `${club}` : "None"}` + `${clubtag ? `${clubtag}` : " "}`)
                .setTimestamp();

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
    name: 'player',
    aliases: ['p']
};