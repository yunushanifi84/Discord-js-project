const {SlashCommandBuilder} = require('discord.js');
const DisTube = require('distube');

module.exports = {
    data:new SlashCommandBuilder()
        .setName('play')
        .setDescription("Müziği çalar.")
        .addStringOption(option =>
            option.setName("muzik")
                .setDescription("Müziğin ismi.")
                .setRequired(true)    
        ),
    async execute(interaction){
        return interaction.reply("Komut Bakımda lütfen daha sonra tekrar deneyiniz.");
        const {client} = interaction;
        const song = interaction.options.getString('muzik');
        const distube = new DisTube(client, { searchSongs: false });
        const queue = distube.createQueue(interaction.guildId, {
            textChannel: interaction.channel,
            voiceChannel: interaction.member.voice.channel
        });
        await queue.join(interaction.member.voice.channel);

        const result = await distube.join(interaction, song);
        interaction.reply(`Oynatılan şarkı : ${result.name}`);
    }
}

