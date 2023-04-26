const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');

function randomint(min,max) {
    return Math.floor(Math.random() * (max -min +1)+min)
}

module.exports = {
    data:new SlashCommandBuilder()
        .setName('zar-at')
        .setDescription("Rastgele sayı veren bir zar atar"),
    
    async execute(interaction) {
        const randomnum = randomint(1,6);
        const atma = new EmbedBuilder()
            .setColor('Aqua')
            .setTitle("Zar atılıyor..")
            .setImage('https://media.giphy.com/media/f73urdknsWliIEZiDw/giphy.gif');
        const dice1 = new EmbedBuilder()
            .setColor('DarkGold')
            .setTitle(`Zar başarıyla atıldı`)
            .setImage('https://i.hizliresim.com/epitszm.png');
        const dice2 = new EmbedBuilder()
            .setColor('DarkGold')
            .setTitle('Zar başarıyla atıldı')
            .setImage('https://i.hizliresim.com/iiqwh6v.png');
        const dice3 = new EmbedBuilder()
            .setColor('DarkGold')
            .setTitle("Zar başarıyla atıldı")
            .setImage('https://i.hizliresim.com/b0arxbu.png');
        const dice4 = new EmbedBuilder()
            .setColor('DarkGold')
            .setTitle("Zar başarıyla atıldı")
            .setImage('https://i.hizliresim.com/iq5z9rb.png');
        const dice5 = new EmbedBuilder()
            .setColor('DarkGold')
            .setTitle("Zar başarıyla atıldı")
            .setImage('https://i.hizliresim.com/qgd6cfw.png');
        const dice6 = new EmbedBuilder()
            .setColor('DarkGold')
            .setTitle("Zar başarıyla atıldı")
            .setImage('https://i.hizliresim.com/ad7mlko.png');
        
        const errembed = new EmbedBuilder()
            .setColor('Red')
            .setTitle("Bir hata oluştu lütfen daha sonra tekrar deneyiniz.");
        await interaction.reply({embeds:[atma]});
        setTimeout(() => {
            if(randomnum==1){
                return interaction.editReply({embeds:[dice1]});
            }
            if(randomnum==2){
                return interaction.editReply({embeds:[dice2]});
            }
            if(randomnum==3){
                return interaction.editReply({embeds:[dice3]});
            }
            if(randomnum==4){
                return interaction.editReply({embeds:[dice4]});
            }
            if(randomnum==5){
                return interaction.editReply({embeds:[dice5]});
            }
            if(randomnum==6){
                return interaction.editReply({embeds:[dice6]});
            }
            return interaction.editReply({embeds:[errembed]});
        }, 3000);
    }
}