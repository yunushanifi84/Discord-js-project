const {SlashCommandBuilder} = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require('@discordjs/voice');

module.exports = {
    data:new SlashCommandBuilder()
        .setName('katil')
        .setDescription("Bulunduğunuz ses kanalına botun katılmasını sağlayınç"),
    async execute(interaction){
        try {
            const Connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.member.guild.id,
                adapterCreator: interaction.member.guild.voiceAdapterCreator,

            });
            interaction.reply("Başarıyla bağlanıldı");
        }catch(err){
            interaction.reply("Bağlantı başarısız");
        }
    }
    
}