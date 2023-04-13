const { SlashCommandBuilder } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('kullanici hakkında bilgiler verir'),
    async execute(interaction) {
        await interaction.reply(`Bu komut ${interaction.user.username} tarafından kullanıldı,Bu kullanıcı ${interaction.member.joinedAt} tarihinde katıldı`);
    },
};