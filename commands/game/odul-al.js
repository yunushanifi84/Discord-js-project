const {SlashCommandBuilder} = require('discord.js');
const mongoose = require('mongoose');
const {dburi} = require('../../config.json');

const userbotSchema = new mongoose.Schema({
    id: String,
    money: {type:Number, default:0},
    nextPrize: {type: Date, default: Date.now}
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

module.exports = {
    data:new SlashCommandBuilder()
        .setName('odul-al')
        .setDescription("Her yarım saatte bir rastgele ödül kazanırsınız.(2 zar atılır toplamlarının 10 katı kadar)"),    
    async execute(interaction) {
        if (mongoose.connection.models['Kullanici-data']) {
            delete mongoose.connection.models['Kullanici-data'];
        }
        await interaction.deferReply();
        const userid = interaction.member.id;
        const User = mongoose.model('Kullanici-data',userbotSchema);
        try {
            let user = await User.findOne({id: userid });
            if(!user) {
                return interaction.editReply("Lütfen önce kayıt olunuz.");
            }
            const now = Date.now();
            if(user.nextPrize > now) {
                const reamingtime = user.nextPrize - now;
                const minutesRemaining = Math.floor(reamingtime/60000);
                if(minutesRemaining > 0 ) {
                    return interaction.editReply(`Zarlarınızı zaten attınız bir sonraki atım için ${minutesRemaining} dakika beklemelisiniz.`);
                }
            }
            const firstdice = randomint(1,6);
            const seconddice = randomint(1,6);
            let miktar = (firstdice+seconddice)*10;
            user.money+=miktar;
            
            user.nextPrize = now + (1800000);
            
            
            
            
            await user.save();
            interaction.editReply(`Günlük ${miktar} kadar para kazandınız toplam paranız: ${user.money}`);
        } catch (error) {
            console.error(error);
            interaction.editReply("Bir hata oluştu daha sonra tekrar deneyiniz.");
        }
    }
}