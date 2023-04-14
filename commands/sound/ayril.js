const {SlashCommandBuilder} = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require('@discordjs/voice');
module.exports = {
    data:new SlashCommandBuilder()
        .setName('ayril')
        .setDescription("Botun kanaldan ayrılmasını sağlar(kanalda bulunmanız gerekir)"),
    async execute(interaction){
        try {
            const Connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.member.guild.id,
                adapterCreator: interaction.member.guild.voiceAdapterCreator,
            });
            Connection.destroy()
            interaction.reply("Başarıyla kanaldan ayrıldı.")
        } catch(err){
            console.log(err);
            interaction.reply("Bir hatayla karşılaşıldı.");
        }
    }
}