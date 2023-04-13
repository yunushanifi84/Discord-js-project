const {SlashCommandBuilder,EmbedBuilder} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName("sunucu")
        .setDescription("Sunucu hakkında bazı bilgiler almaya yarar.")
        .addStringOption(option =>
            option.setName('secim')
            .setDescription("Sunucu hakkında bilgiler.")
            .setRequired(true)
            .addChoices(
                { name: 'Bilgi', value: 'bilgi'},
                { name: 'Kullanıcı', value:'kullanici'},
            )
        
        ),
    async execute(interaction) {
        const {options,guild} = interaction;
        const secenek = options.getString('secim');
        if(secenek=='bilgi'){
            const cevap = new EmbedBuilder()
                .setTitle("Sunucu Hakkında Bilgiler")
                .setFields(
                    {name:"Kullanıcı Sayısı:",value:`${interaction.member.guild.memberCount}`},
                    {name:"Kurulduğu Tarih:",value:`${interaction.member.guild.createdAt}`},
                )
            return interaction.reply({embeds: [cevap]});
        }
        
    }
}