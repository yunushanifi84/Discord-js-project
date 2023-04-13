const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('soyle')
        .setDescription("Yazdığınız şeyi söyler.")
        .addStringOption(Option =>
            Option.setName('yazi')
                .setDescription("Söyleyeceği Yazı!")
                .setRequired(true)    
        ),
    async execute(interaction) {
        const {options} = interaction;
        const yazi = options.getString('yazi');
        await interaction.reply({content:"tamam", ephemeral:true})
        await interaction.channel.send(`${yazi}`);
    }
}