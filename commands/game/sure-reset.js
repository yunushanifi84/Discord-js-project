const {SlashCommandBuilder} = require('discord.js');
const mongoose = require('mongoose');
const {dburi,adminid} = require('../../config.json');

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
    console.log('Veritabanı bağlantısı tamam.(sure-reset)');
});

module.exports = {
    data:new SlashCommandBuilder()
        .setName('sure-reset')
        .setDescription("Admin komutudur .. kısaca ödül süresini resetler"),
    async execute(interaction) {
        if (mongoose.connection.models['Kullanici-data']) {
            delete mongoose.connection.models['Kullanici-data'];
        }
        await interaction.deferReply();
        const userid = interaction.member.id;
        if(!(adminid==userid)) {
            return interaction.editReply("Buna yetkiniz yok.");
        }
        const User = mongoose.model('Kullanici-data',userbotSchema);
        try {
            let user = await User.findOne({id:userid});
            if(!user) {
                return interaction.editReply("Lütfen önce kayıt olunuz.");
            }
            user.nextPrize = Date.now();
            user.save();
            return interaction.editReply("Süre başarıyla sıfırlandı.");
        } catch (error) {
            console.error(error);
            interaction.editReply("Bir hatayla karşılaşıldı.");
        }
    }
}