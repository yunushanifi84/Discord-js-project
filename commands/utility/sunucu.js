const {SlashCommandBuilder} = require('discord.js')


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
        const {options} = interaction;
        const secenek = options.getString('secim');
        interaction.reply(`${secenek}`);
    }
}