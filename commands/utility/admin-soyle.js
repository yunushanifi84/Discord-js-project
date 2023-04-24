const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');
const {adminid} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin-soyle')
        .setDescription("(Admin komutu)Yazdığınız şeyi söyler.")
        .addStringOption(Option =>
            Option.setName('yazi')
                .setDescription("Söyleyeceği Yazı!")
                .setRequired(true)    
        ),
    async execute(interaction) {
        const {options} = interaction;
        if(!(adminid==interaction.membed.id)) {
            const yetkiembed = new EmbedBuilder()
                .setTitle('Bu komutu kullanmak için yetkiniz yok.')
                .setColor('DarkRed');
            return interaction.reply({embeds:[yetkiembed]});
        }
        const yazi = options.getString('yazi');
        await interaction.reply({content:`Mesaj Gönderildi.`, ephemeral:true});
        await interaction.channel.send(`${yazi}`);
    }
}