const {SlashCommandBuilder} = require('discord.js');

function randomint(min,max) {
    return Math.floor(Math.random() * (max -min +1)+min)
}

module.exports = {
    data:new SlashCommandBuilder()
        .setName('zar')
        .setDescription("Rastgele sayı veren bir zar atar"),
    
    async execute(interaction) {
        const randomnum = randomint(1,6);
        interaction.reply(`Atış başarılı gelen sayı: ${randomnum}`);
    }
}