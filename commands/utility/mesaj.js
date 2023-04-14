const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mesaj")
        .setDescription("Belirtilen kişiye mesaj yollanır")
        .addUserOption(option =>
            option.setName('hedef')
                .setDescription("Mesaj gönderilecek kişi.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('icerik')
                .setDescription("Gönderilecek mesajın içeriği.")
                .setRequired(true)    
        ),
    async execute(interaction) {
        const { options, guild } = interaction;
        const user = options.getUser('hedef');
        const member = guild.members.cache.get(user.id);
        const gonderilecekmesaj = options.getString('icerik');
        try {
            await member.send(gonderilecekmesaj);
            await interaction.reply({content:'Mesaj gönderildi!', ephemeral:true});
        } catch(err) {
            console.log(err);
            await interaction.reply({content:'Bir hatayla karşılaşıldı', ephemeral:true});
        }
    }
}