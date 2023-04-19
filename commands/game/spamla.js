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
    console.log('Veritabanı bağlantısı tamam.(spamla)');
});

module.exports = {
    data:new SlashCommandBuilder()
        .setName('spamla')
        .setDescription("Bot puanları kullanarak kişiye özelden mesaj yağdırabilirsiniz./100pm")
        .addUserOption(option =>
            option.setName('hedef')
                .setDescription("Mesaj göndertmek istediğiniz kişi")
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('mesaj')
                .setDescription("Göndertmek istediğiniz mesajların içeriği.")
                .setRequired(true)    
        )
        .addNumberOption(option =>
            option.setName('miktar')
                .setDescription("Kaç tane mesaj göndereceğiniz.")
                .setRequired(true)    
        ),
    async execute(interaction) {
        //Model kontorlü
        if (mongoose.connection.models['Kullanici-data']) {
            delete mongoose.connection.models['Kullanici-data'];
        }
        //etkileşimin başarız olmasını engelleme
        await interaction.deferReply();
        //çıktıları almak için methodu aktarma
        const {options,guild} = interaction;
        const hedef = options.getUser('hedef');
        const mesaj = options.getString('mesaj');
        const miktar = options.getNumber('miktar');
        const hedefnesne = guild.members.cache.get(hedef.id);
        const User = mongoose.model('Kullanici-data',userbotSchema);
        //db kontrolü
        const userid = interaction.member.id;
        try {
            const user =await User.findOne({id:userid});
            if(!user) {
            const kayitembed = new EmbedBuilder()
                    .setTitle('Lütfen önce kayıt olunuz.')
                    .setColor('LightGrey');
            return interaction.editReply({embeds:[kayitembed]});
            }
            //para kontrolü
            const ucret = (miktar)*100;
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
                    {name:'Mesaj adeti',value:`${miktar}`},
                    {name:'Bedeli',value:`${ucret} puan kullanıldı.`},
                    {name:'Kalan para',value:`${user.money}`}
                ])
                .setColor('Green');
            
            //mesaj gönderimi..
            for(let i=0;i<miktar;i++){
                await hedefnesne.send(mesaj);
            }
            await interaction.editReply({embeds:[succembed], ephemeral:true});
        } catch(err) {
            console.log(err);
            const errEmbed = new EmbedBuilder()
                .setTitle("Bir hatayla karşılaşıldı..")
                .setColor('Red');
            await interaction.editReply({embeds:[errEmbed], ephemeral:true});
        }


    }
}