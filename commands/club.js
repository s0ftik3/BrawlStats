const Discord = require('discord.js');
const request = require('request');
const config = require('../config.json');
const token = config.bstoken;

module.exports.run = async (bot, msg, args) =>
{

    let usage = new Discord.MessageEmbed()
        .setTitle('Wrong input')
        .setColor('BLUE')
        .setDescription('Usage: `?club <tag>`\n\n_Note: you can use ?c instead of ?club_')

    if(!args[0]) return msg.channel.send(usage);
    var query = args[0];

    var options = {
        'method': 'GET',
        'url': `https://api.brawlstars.com/v1/clubs/%23${query}`,
        'headers': {
            'Accept': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };

    request(options, function (error, response) { 

        try {

            var obj = JSON.parse(response.body);

            let tag = obj.tag;
            let name = obj.name;
            let description = obj.description;
            let reqTrophies = obj.requiredTrophies;
            let trophies = obj.trophies;
            let members = obj.members.length;
            let president = obj['members'].find(item => item.role == 'president');
            let presname = president.name;
            let prestag = president.tag;
            let prestrophies = president.trophies;

            let embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle(`Club [${tag}] :shield:`)
                .setDescription(description)
                .addField('Name :page_facing_up: ', name, true)
                .addField('Members :busts_in_silhouette:', `**${members}** of **100**`, true)
                .addField('Trophies :trophy: ', `**${trophies}**`, true)
                .addField('Enter Trophies :unlock:', `**${reqTrophies}**`, true)
                .addField('President :crown:', `${presname} [${prestag}] :trophy: **${prestrophies}**`, true)
                .setTimestamp();

            msg.channel.send(embed);

        }
        catch (error)
        {

            let embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Error!')
                .setDescription('Syntax error. Please, check clubtag.\n\n_Note: do not put # before the tag._')

            msg.channel.send(embed);

        }

    });

}

module.exports.help =
{
    name: 'club',
    aliases: ['c']
};