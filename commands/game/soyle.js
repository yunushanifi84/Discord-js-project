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
    console.log('Veritabanı bağlantısı tamam.(mesaj)');
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('soyle')
        .setDescription("Yazdığınız şeyi söyler.(100 puan)")
        .addStringOption(Option =>
            Option.setName('yazi')
                .setDescription("Söyleyeceği Yazı!")
                .setRequired(true)    
        ),
    async execute(interaction) {
        const ucret = 100;
        if (mongoose.connection.models['Kullanici-data']) {
            delete mongoose.connection.models['Kullanici-data'];
        }
        await interaction.deferReply();
        const {options} = interaction;
        const yazi = options.getString('yazi');
        const User = mongoose.model('Kullanici-data',userbotSchema);
        const userid = interaction.member.id;
        try {
            let user =await User.findOne({id:userid});
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
                .setTitle('Mesaj Söyleniyor...')
                .setFields([
                    {name:'Mesajın içeriği',value:`${yazi}`},
                    {name:'Bedeli',value:`${ucret} puan kullanıldı.`},
                    {name:'Kalan para',value:`${user.money}`}
                ])
                .setColor('Green');
            await interaction.channel.send(`${yazi}`);
            return interaction.editReply({embeds:[succembed],ephemeral:true});
        }catch(err) {
            console.log(err);
            await interaction.editReply({content:'Bir hatayla karşılaşıldı', ephemeral:true});
        }
    }
}