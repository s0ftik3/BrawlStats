const Discord = require('discord.js');
const request = require('request');
const config = require('../config.json');
const token = config.bstoken;

module.exports.run = async (bot, msg, args) =>
{

    try {

        const filter = (reaction, user) => ['🟢', '🟠', '🔴'].includes(reaction.emoji.name) && user.id === msg.author.id;

        var embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Top :military_medal:')
            .setDescription('What top do you want to see? React below.\n\n:green_circle: - Players\n:orange_circle: - Clubs\n:red_circle: - Brawlers **(doesn\'t work so far)**');

        msg.channel.send(embed)
        .then(async msg => {

            await msg.react("🟢")
            await msg.react("🟠")
            // await msg.react("🔴") 

            msg.awaitReactions(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
            }).then(collected => {
    
                const reaction = collected.first();
    
                switch (reaction.emoji.name) {
                    case '🟢':

                        msg.reactions.removeAll();

                        var options = {
                            'method': 'GET',
                            'url': `https://api.brawlstars.com/v1/rankings/global/players`,
                            'headers': {
                                'Accept': 'application/json',
                                'authorization': `Bearer ${token}`
                            }
                        };
                        
                        request(options, function (error, response) { 

                        var obj = JSON.parse(response.body);
                        var itemArray = [];
                        var items = obj.items;

                        for (let i = 0; i < 10; i++)
                        {
                            let name = items[i].name;
                            let tag = items[i].tag;
                            let trophies = items[i].trophies;
                            let rank = items[i].rank;

                            let ranks = {
                                "1": ":one:",
                                "2": ":two:",
                                "3": ":three:",
                                "4": ":four:",
                                "5": ":five:",
                                "6": ":six:",
                                "7": ":seven:",
                                "8": ":eight:",
                                "9": ":nine:",
                                "10": ":keycap_ten:",
                            }

                            itemArray.push(ranks[rank] + ` ${name} **[${tag}]** :trophy: **${trophies}**`);
                        }
                        itemArray.join('\n');

                        var newembed = new Discord.MessageEmbed()
                            .setColor('BLUE')
                            .setTitle('Players :video_game:')
                            .setDescription(itemArray)
                            .setFooter(`Global top 10 players`)
                            .setTimestamp();
                
                        msg.edit(newembed);

                        })

                        break;

                    case '🟠':

                        msg.reactions.removeAll();

                        var options = {
                            'method': 'GET',
                            'url': `https://api.brawlstars.com/v1/rankings/global/clubs`,
                            'headers': {
                                'Accept': 'application/json',
                                'authorization': `Bearer ${token}`
                            }
                        };
                        
                        request(options, function (error, response) { 

                        var obj = JSON.parse(response.body);
                        var itemArray = [];
                        var items = obj.items;

                        for (let i = 0; i < 10; i++)
                        {
                            let name = items[i].name;
                            let tag = items[i].tag;
                            let trophies = items[i].trophies;
                            let rank = items[i].rank;
                            let members = items[i].memberCount;

                            let ranks = {
                                "1": ":one:",
                                "2": ":two:",
                                "3": ":three:",
                                "4": ":four:",
                                "5": ":five:",
                                "6": ":six:",
                                "7": ":seven:",
                                "8": ":eight:",
                                "9": ":nine:",
                                "10": ":keycap_ten:",
                            }

                            itemArray.push(ranks[rank] + ` ${name} **[${tag}]** :trophy: **${trophies}** :busts_in_silhouette: **${members}** members`);
                        }
                        itemArray.join('\n\n');

                        var newembed = new Discord.MessageEmbed()
                            .setColor('BLUE')
                            .setTitle('Clubs :shield:')
                            .setDescription(itemArray)
                            .setFooter(`Global top 10 clubs`)
                            .setTimestamp();
                
                        msg.edit(newembed);

                        })

                        break;

                    case '🔴':

                        /* msg.reactions.removeAll();

                        var options = {
                            'method': 'GET',
                            'url': `https://api.brawlstars.com/v1/rankings/global/clubs`,
                            'headers': {
                                'Accept': 'application/json',
                                'authorization': `Bearer ${token}`
                            }
                        };
                        
                        request(options, function (error, response) { 

                        var obj = JSON.parse(response.body);
                        var itemArray = [];
                        var items = obj.items;

                        for (let i = 0; i < 10; i++)
                        {
                            let name = items[i].name;
                            let tag = items[i].tag;
                            let trophies = items[i].trophies;
                            let rank = items[i].rank;
                            let members = items[i].memberCount;
                            itemArray.push(`**[${rank}]** ${name} **[${tag}]** :trophy: **${trophies}** **${members}** members`);
                        }
                        itemArray.join('\n');

                        var newembed = new Discord.MessageEmbed()
                            .setColor('BLUE')
                            .setTitle('Clubs')
                            .setDescription(itemArray)
                            .setFooter(`Global top 10 brawlers`)
                            .setTimestamp();
                
                        msg.edit(newembed);

                        }) */
                    
                        return;

                }
            }).catch(error => {
                msg.channel.send(`I couldn't provide you information!`);
                console.log(error);
            })
        })


    }
    catch (error)
    {

        let embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error!')
            .setDescription('Syntax error.\n\n' + error)

        msg.channel.send(embed);

    }

}

module.exports.help =
{
    name: 'top',
    aliases: ['t']
};