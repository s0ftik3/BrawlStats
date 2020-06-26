const Discord = require('discord.js');

module.exports.run = async (bot, msg, args) =>
{

    try {

        let embed = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('Help')
            .addFields(
                { name: '`?player`', value: 'Player stats.', inline: true },
                { name: '`?club`', value: 'Club stats.', inline: true },
                { name: '`?clubtop`', value: 'Top 10 club players.', inline: true },
                { name: '`?top`', value: 'Top 10 players or clubs (Global).', inline: true },
                { name: '`?battle`', value: 'Last battle log of player.', inline: true },
                { name: '`?brawlers`', value: 'Number of brawlers in game / information about specific brawler.', inline: true },
            )
            .setFooter('Made with ❤️ by softik#8376', 'https://cdn.discordapp.com/avatars/327814559777947678/9ddfe6cbc775a2622e63c81da607990f.webp')

        msg.channel.send(embed);

    }
    catch (error)
    {

        let embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error!')
            .setDescription('Error occured\n\n' + error)

        msg.channel.send(embed);

    }

}

module.exports.help =
{
    name: 'help',
    aliases: ['commands', 'cmds']
};