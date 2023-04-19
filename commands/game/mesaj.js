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
    console.log('Veritabanı bağlantısı tamam.(mesaj)');
});


module.exports = {
    data: new SlashCommandBuilder()
        .setName("mesaj")
        .setDescription("Belirtilen kişiye mesaj yollanır(200 puan)")
        .addUserOption(option =>
            option.setName('hedef')
                .setDescription("Mesaj gönderilecek kişi.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('icerik')
                .setDescription("Gönderilecek mesajın içeriği.")
                .setRequired(true)    
        ),
    async execute(interaction) {
        const ucret = 200;
        if (mongoose.connection.models['Kullanici-data']) {
            delete mongoose.connection.models['Kullanici-data'];
        }
        await interaction.deferReply();
        const { options, guild } = interaction;
        const hedef = options.getUser('hedef');
        const member = guild.members.cache.get(hedef.id);
        const gonderilecekmesaj = options.getString('icerik');
        const User = mongoose.model('Kullanici-data',userbotSchema);
        const userid = interaction.member.id;

        try {
            let user = await User.findOne({id: userid });
            if(!user) {
                const kayitembed = new EmbedBuilder()
                    .setTitle('Lütfen önce kayıt olunuz.')
                    .setColor('LightGrey');
                return interaction.editReply({embeds:[kayitembed]});
            }
            if(ucret>user.money) {
                const parayok = new EmbedBuilder()
                    .setTitle('Yeterli paranız bulunmamakta...')
                    .setColor('Orange');
                return interaction.editReply({embeds:[parayok]});
            }
            user.money-=ucret;
            await user.save();
            const succembed = new EmbedBuilder()
                .setTitle('Mesaj gönderiliyor....')
                .setFields([
                    {name:'Mesajın içeriği',value:`${gonderilecekmesaj}`},
                    {name:'Bedeli',value:`${ucret} puan kullanıldı.`},
                    {name:'Kalan para',value:`${user.money}`}
                ])
                .setColor('Green');
            await member.send(gonderilecekmesaj);
            await interaction.editReply({embeds:[succembed], ephemeral:true});
        } catch(err) {
            console.log(err);
            await interaction.editReply({content:'Bir hatayla karşılaşıldı', ephemeral:true});
        }
    }
}