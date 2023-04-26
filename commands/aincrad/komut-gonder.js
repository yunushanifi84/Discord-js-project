const {SlashCommandBuilder,EmbedBuilder} = require('discord.js');
const {exec} = require('child_process');
const {adminid} = require("../../config.json");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('komut-gonder')
        .setDescription("Komut göndermek için tasarlandı yönetici izni gerekli..")
        .addStringOption(option =>
            option.setName('komut-tipi')
                .setDescription("Kullanılacak komut.")
                .setRequired(true)
                .addChoices(
                    {name:"Çanta",value:"canta"},
                    {name:"karakter",value:"karakter"}
                )
        )
        .addStringOption(option =>
            option.setName("hedef")
                .setDescription("Kullanıcak kişi.")
                .setRequired(true)
                .addChoices(
                    {name:"NoM",value:'player1'},
                    {name:"untitled",value:'player2'},
                    {name:"Nullfier",value:'player3'},
                    {name:"SoulAbsorber",value:'player4'}
                )
        ),
    
    async execute(interaction) {
        await interaction.deferReply();
        const {options} = interaction;
        if(!(interaction.member.id == adminid)) {
            const errEmbed = new EmbedBuilder()
                .setTitle("Bu Komutu kullanmak için yetkiniz yok.")
                .setColor('Red');
            interaction.editReply({embeds:[errEmbed]});
        }
        const kullanilacak_komut = options.getString('komut-tipi');
        const hedefuser = options.getString('hedef');
        
        try {
            if(kullanilacak_komut == 'canta') {
                if(hedefuser == "player1") {
                    exec("python ./commands/aincrad/pythonfiles/player1-bag.py",(stdout) => {
                        console.log(stdout);
                    });
                    let SuccEmbed = new EmbedBuilder()
                    .setTitle("Başarılı Bir şekilde komut kullanıldı")
                    .setFields([
                        {name:"Kullanılan komut",value:`Çanta açma`},
                        {name:"Kullanan kişi",value:`NoM`}
                    ]);
                    return interaction.editReply({embeds:[SuccEmbed]});
                }
                if(hedefuser == "player2") {
                    exec("python ./commands/aincrad/pythonfiles/player2-bag.py");
                    let SuccEmbed = new EmbedBuilder()
                    .setTitle("Başarılı Bir şekilde komut kullanıldı")
                    .setFields([
                        {name:"Kullanılan komut",value:`Çanta açma`},
                        {name:"Kullanan kişi",value:`Untitled`}
                    ]);
                    return interaction.editReply({embeds:[SuccEmbed]});
                }
                if(hedefuser == "player3") {
                    exec("python ./commands/aincrad/pythonfiles/player3-bag.py");
                    let SuccEmbed = new EmbedBuilder()
                    .setTitle("Başarılı Bir şekilde komut kullanıldı")
                    .setFields([
                        {name:"Kullanılan komut",value:`Çanta açma`},
                        {name:"Kullanan kişi",value:`Nullfier`}
                    ]);
                    return interaction.editReply({embeds:[SuccEmbed]});
                }
                if(hedefuser == "player4") {
                    exec("python ./commands/aincrad/pythonfiles/player4-bag.py");
                    let SuccEmbed = new EmbedBuilder()
                    .setTitle("Başarılı Bir şekilde komut kullanıldı")
                    .setFields([
                        {name:"Kullanılan komut",value:`Çanta açma`},
                        {name:"Kullanan kişi",value:`SoulAbsorber`}
                    ]);
                    return interaction.editReply({embeds:[SuccEmbed]});
                }
            }
            else {
                return interaction.editReply("BU KOMUT ŞUANDA DEVRE DIŞI.");
            }
        } catch(error) {
            await interaction.editReply({content:'Bir hatayla karşılaşıldı', ephemeral:true});
            console.log(error)
        }
    }
        
}