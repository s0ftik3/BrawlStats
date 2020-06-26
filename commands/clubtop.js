const Discord = require('discord.js');
const request = require('request');
const config = require('../config.json');
const token = config.bstoken;

module.exports.run = async (bot, msg, args) =>
{

    let usage = new Discord.MessageEmbed()
        .setTitle('Wrong input')
        .setColor('BLUE')
        .setDescription('Usage: `?clubtop <tag>`\n\n_Note: you can use ?ct or ?ctop instead of ?clubtop_')

    if(!args[0]) return msg.channel.send(usage);
    var query = args[0];

    var options = {
        'method': 'GET',
        'url': `https://api.brawlstars.com/v1/clubs/%23${query}/members`,
        'headers': {
            'Accept': 'application/json',
            'authorization': `Bearer ${token}`
        }
    };

    request(options, function (error, response) { 

        try {

            var obj = JSON.parse(response.body);
            var itemArray = [];
            var items = obj.items;

            var roles = {
                "member": "Member",
                "senior": "Senior",
                "vicePresident": "Vice President",
                "president": "President :crown:"
            }

            for (let i = 0; i < 10; i++)
            {
                let name = items[i].name;
                let tag = items[i].tag;
                let trophies = items[i].trophies;
                let role = items[i].role
                itemArray.push(`**[${i + 1}]** ${name} [**${tag}**] :trophy: **${trophies}** [` + roles[role] + ']');
            }

            // let items = obj.items;
            // msg.channel.send(items.map(i => `${i.name}${i.tag} ${i.trophies}`).join(`\n`));

            itemArray.join('\n');
            let embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('Top 10')
                .addField('Members', itemArray)
                .setFooter(`10 top members of ${items.length}`)
                .setTimestamp();

            msg.channel.send(embed);

        }
        catch (error)
        {

            let embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Error!')
                .setDescription('Syntax error. Please, check clubtag.\n\n_Note: do not put # before the tag._\n\n' + error)

            msg.channel.send(embed);

        }

    });

}

module.exports.help =
{
    name: 'clubtop',
    aliases: ['ct', 'ctop']
};