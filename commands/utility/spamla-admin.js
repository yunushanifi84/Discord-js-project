const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');
const {adminid} = require('../../config.json');


module.exports = {
    data:new SlashCommandBuilder()
        .setName('admin-spamla')
        .setDescription("(Admin Komutu) kişiye özelden mesaj yağdırabilirsiniz./100pm")
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
            const succembed = new EmbedBuilder()
                .setTitle('Mesaj gönderiliyor....')
                .setFields([
                    {name:'Mesajın içeriği',value:`${mesaj}`},
                    {name:'Mesaj adeti',value:`${miktar}`},
                    {name:'Bedeli',value:`${ucret} puan kullanıldı.`},
                    {name:'Kalan para',value:`${user.money}`}
                ])
                .setColor('Green');
            await interaction.editReply({embeds:[succembed], ephemeral:true});
            //mesaj gönderimi..
            for(let i=0;i<miktar;i++){
                await hedefnesne.send(mesaj);
            }
        } catch(err) {
            console.log(err);
            const errEmbed = new EmbedBuilder()
                .setTitle("Bir hatayla karşılaşıldı..")
                .setColor('Red');
            await interaction.editReply({embeds:[errEmbed], ephemeral:true});
        }


    }
}