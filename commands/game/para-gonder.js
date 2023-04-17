const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');
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
    console.log('Veritabanı bağlantısı tamam.(para-gonder)');
});

module.exports = {
    data:new SlashCommandBuilder()
        .setName('para-gonder')
        .setDescription("Belirtilen kişiye para gönderir.")
        .addUserOption(option =>
            option.setName('hedef')
                .setDescription("Göndermek istediğiniz kişi")
                .setRequired(true)    
        )
        .addNumberOption(option =>
            option.setName('para')
                .setDescription("Göndermek istediğiniz miktar.")
                .setRequired(true)    
        ),
    async execute(interaction) {
        const {options} = interaction;
        if (mongoose.connection.models['Kullanici-data']) {
            delete mongoose.connection.models['Kullanici-data'];
        }
        await interaction.deferReply();
        const userid = interaction.member.id;
        const User = mongoose.model('Kullanici-data',userbotSchema);
        const gonderilecekid = options.getUser('hedef').id;
        const miktar = options.getNumber('para');
        try {
            let user1 = await User.findOne({id:userid});
            let user2 = await User.findOne({id:gonderilecekid});
            if(!user1) {
                const kayitembed1 = new EmbedBuilder()
                .setTitle('Lütfen önce kayıt olunuz.')
                .setColor('LightGrey');
                return interaction.editReply({embeds:[kayitembed1]});
            }
            if(!user2) {
                const kayitembed2 = new EmbedBuilder()
                .setTitle('Hedeflediğiniz kişi sisteme kayıtlı değil.')
                .setColor('LightGrey');
                return interaction.editReply({embeds:[kayitembed2]});
            }
            user1.money -=miktar;
            user2.money +=miktar;
            const succembed = new EmbedBuilder()
                .setTitle(`İşlem başarılı. Yeni bakiyeniz: ${user1.money}`)
                .setColor('DarkGreen');
            user1.save();
            user2.save();
            return interaction.editReply({embeds:[succembed]});
            

        } catch(error) {
            console.error(error);
            const errembed = new EmbedBuilder()
            .setTitle("Bir hatayla karşılaşıldı lütfen daha sonra tekrar deneyiniz.")
            .setColor('Red');
            interaction.editReply({embeds:[errembed]});
        }
    } 
}