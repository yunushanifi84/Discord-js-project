const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');
const mongoose = require('mongoose');
const {dburi} = require('../../config.json');

const userbotSchema = new mongoose.Schema({
    id: String,
    money: {type:Number, default:0},
    nextPrize: {type: Date, default: Date.now},
    DisplayName: String
});
mongoose.connect(dburi, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error',console.error.bind(console, 'Bağlantı hatası.'));
db.once('open', function() {
    console.log('Veritabanı bağlantısı tamam.(odul-al)');
});

function randomint(min,max) {
    return Math.floor(Math.random() * (max -min +1)+min)
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

module.exports = {
    data:new SlashCommandBuilder()
        .setName('odul-al')
        .setDescription("Her 15 dakikada bir rastgele ödül kazanırsınız.(2 zar atılır toplamlarının 10 katı kadar)"),    
    async execute(interaction) {
        const atma = new EmbedBuilder()
            .setColor('Aqua')
            .setTitle("Zar atılıyor..")
            .setImage('https://media.giphy.com/media/f73urdknsWliIEZiDw/giphy.gif');
        if (mongoose.connection.models['Kullanici-data']) {
            delete mongoose.connection.models['Kullanici-data'];
        }
        await interaction.deferReply();
        await sleep(1000);
        const userid = interaction.member.id;
        const User = mongoose.model('Kullanici-data',userbotSchema);
        try {
            let user = await User.findOne({id: userid });
            const kayitembed = new EmbedBuilder()
                .setTitle('Lütfen önce kayıt olunuz.')
                .setColor('LightGrey');
            
            
            if(!user) {
                return interaction.editReply({embeds:[kayitembed]});
            }
            const now = Date.now();
            if(user.nextPrize > now) {
                const reamingtime = user.nextPrize - now;
                const minutesRemaining = Math.floor(reamingtime/60000);
                const waittime = new EmbedBuilder()
                    .setTitle("Zarlarınızı zaten attınız.")
                    .setFields([
                        {name:'Kalan zaman',value:`${minutesRemaining} dakika.`}
                    ])
                    .setColor('Blue');
                if(minutesRemaining > 0 ) {
                    return interaction.editReply({embeds:[waittime]});
                }
            }
            await interaction.editReply({embeds:[atma]});
            await sleep(3000);
            const firstdice = randomint(1,6);
            const seconddice = randomint(1,6);
            let miktar = (firstdice+seconddice)*10;
            user.money+=miktar;
            
            user.nextPrize = now + (900000);
            const basariliatim = new EmbedBuilder()
                .setTitle('Zarlar başarıyla atıldı.')
                .setFields([
                    {name:'İlk zar',value:`${firstdice}`},
                    {name:'İkinci zar',value:`${seconddice}`},
                    {name:'Kazanılan para',value:`${miktar}`},
                    {name:'Paranız',value:`${user.money}`}
                ])
                .setColor('Green');
            
            
            
            await user.save();
            interaction.editReply({embeds:[basariliatim]});
        } catch (error) {
            const errembed = new EmbedBuilder()
            .setTitle("Bir hatayla karşılaşıldı lütfen daha sonra tekrar deneyiniz.")
            .setColor('Red');
            console.error(error);
            interaction.editReply({embeds:[errembed]});
        }
    }
}