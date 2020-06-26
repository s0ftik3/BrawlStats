const Discord = require('discord.js');
const request = require('request');
const config = require('../config.json');
const token = config.bstoken;

module.exports.run = async (bot, msg, args) =>
{

    let bwname = args.join(' ').toLowerCase();

    if(!bwname) {
        var options = {
            'method': 'GET',
            'url': `https://api.brawlstars.com/v1/brawlers`,
            'headers': {
                'Accept': 'application/json',
                'authorization': `Bearer ${token}`
            }
        };

    request(options, function (error, response) { 

        try {

            var obj = JSON.parse(response.body);
            var items = obj.items;

            let embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('Brawlers')
                .setThumbnail('https://cdna.artstation.com/p/assets/images/images/016/603/776/large/nebojsa-bosnjak-brawl-stars-logo.jpg?1552776881')
                .setDescription(`There are ${items.length} brawlers in game currently.\n\nUse \`!brawlers <brawler-name>\` to find out more about a specific brawler.`)
                .setTimestamp();

            msg.channel.send(embed);

        }
        catch (error)
        {

            let embed = new Discord.MessageEmbed()
                .setColor('RED')
                .setTitle('Error!')
                .setDescription('Something went wrong.\n\n' + error)

            msg.channel.send(embed);

        }

    });

    }
    else
    {

        try {

            let bwids = {
                "shelly": "16000000", "colt": "16000001", "bull": "16000002", "brock": "16000003", "rico": "16000004",
                "spike": "16000005", "barley": "16000006", "jessie": "16000007", "nita": "16000008", "dynamike": "16000009",
                "el primo": "16000010", "mortis": "16000011", "crow": "16000012", "poco": "16000013", "bo": "16000014",
                "piper": "16000015", "pam": "16000016", "tara": "16000017", "darryl": "16000018", "penny": "16000019",
                "frank": "16000020", "gene": "16000021", "tick": "16000022", "leon": "16000023", "rosa": "16000024",
                "carl": "16000025", "bibi": "16000026", "8-bit": "16000027", "sandy": "16000028", "bea": "16000029",
                "emz": "16000030", "mr. p": "16000031", "max": "16000032", "jacky": "16000034", "gale": "16000035",
                "nani": "16000036", "sprout": "16000037"
            }

            let query = bwids[bwname];

            var options = {
                'method': 'GET',
                'url': `https://api.brawlstars.com/v1/brawlers/${query}`,
                'headers': {
                    'Accept': 'application/json',
                    'authorization': `Bearer ${token}`
                }
            };

        request(options, function (error, response) { 

            var obj = JSON.parse(response.body);

            let name = obj.name;
            let starpowers = obj['starPowers'].length;
            let gadgets = obj['gadgets'].length;

            let itemArray = [];

            for (let i = 0; i < 2; i++)
            {
                let starNames = obj.starPowers[i].name;

                itemArray.push(starNames);
            }
            itemArray.join('\n');

            let itemArrayTwo = [];

            for (let i = 0; i < 1; i++)
            {
                let gadgets = obj.gadgets[i].name;

                itemArrayTwo.push(gadgets);
            }
            itemArrayTwo.join('\n');

            let embed = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle(`Brawler info :performing_arts:`)
                .addField('Name :page_facing_up:', name, true)
                .addField(`Starpowers :star: [${starpowers}]`, itemArray, true)
                .addField(`Gadgets :gun: [${gadgets}]`, itemArrayTwo, true);

            msg.channel.send(embed);

        })

    } catch (error) {

        let embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error!')
            .setDescription('Couldn\'t found such a brawler. Please, check your request.')

        msg.channel.send(embed);

    }

    }

}

module.exports.help =
{
    name: 'brawlers',
    aliases: ['bw', 'b']
};