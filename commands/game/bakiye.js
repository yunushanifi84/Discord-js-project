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
    console.log('Veritabanı bağlantısı tamam.(Bakiye)');
});
module.exports = {
    data:new SlashCommandBuilder()
        .setName('bakiye')
        .setDescription("Bot içi bakiyenizi görebilirsiniz."),
    
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
            return interaction.editReply(`Şu anki bakiyeniz: ${user.money}`);
        } catch (error) {
            console.error(error);
            interaction.editReply("Bir hata oluştu daha sonra tekrar deneyiniz.");
        }
    }
}