const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');
const {adminid} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
        .setName("admin-mesaj")
        .setDescription("(Admin komutu)Belirtilen kişiye mesaj yollanır")
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
        if(!(adminid==interaction.member.id)) {
            const yetkiembed = new EmbedBuilder()
                .setTitle('Bu komutu kullanmak için yetkiniz yok.')
                .setColor('DarkRed');
            return interaction.reply({embeds:[yetkiembed]});
        }
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