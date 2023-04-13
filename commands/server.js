const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Sunucu hakkında bilgiler verir'),
    async execute(interaction) {
        
        await interaction.reply(`Bu sunucunun ismi ${interaction.guild.name} ve ${interaction.guild.memberCount} kadar üyeye sahip`);
    },
};