const {SlashCommandBuilder, PermissionFlagsBits,EmbedBuilder, embedLength,ActivityType} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('durum')
        .setDescription("Botun durum ve aktivite değerlerine erişim sağlar.")
        .addStringOption(option =>
            option.setName('durum-mesaji')
                .setDescription("Durumda gözükecek mesaj")
                .setRequired(true)    
        )
        .addStringOption(option =>
            option.setName('durum-modu')
                .setDescription("Durumların modları")
                .setRequired(true)
                .addChoices(
                    {name:'Çevrimiçi', value:'cevirimici'},
                    {name:'Boşta', value:'bosta'},
                    {name:'Meşgul etmeyin', value:'mesgul'},
                    {name:'Görünmez', value:'gorunmez'},
                )    
        )
        .addStringOption(option =>
            option.setName('aktivite-modu')
                .setDescription("Aktivite durum şekli.")
                .setRequired(true)
                .addChoices(
                    {name:'Rekabet', value:'Competing'},
                    {name:'Dinliyor', value:'Listening'},
                    {name:'Oynuyor', value:'Playing'},
                    {name:'İzliyor', value:'Watching'},
                )
        ),
    async execute(interaction){
        const {options} = interaction;
        const yenidurum = options.getString('durum-mesaji');
        const durum_modu = options.getString('durum-modu');
        const aktivite_modu = options.getString('aktivite-modu');
        
        if(interaction.user.id!='718497288963620904') {
            return interaction.reply("Bu komutu kullanma yetkiniz yok.");
        }

        const errEmbed = new EmbedBuilder()
            .setDescription('Birşeyler yanlış gitti. Lütfen daha sonra tekrar deneyiniz.')
            .setColor('Red')
        const succEmbed = new EmbedBuilder()
            .setTitle('Başarılı')
            .setFields(
                {name:'Durum:',value:yenidurum},
                {name:'Yeni Durum modu:',value:durum_modu},
                {name:'Yeni Aktivite modu:',value:aktivite_modu},
            )
            .setColor('Green')
            .setTimestamp()
        
        if(aktivite_modu == 'Competing'){
            try {
                interaction.client.user.setPresence({
                    activities: [{ name: yenidurum, type: ActivityType.Competing }],
                    status: durum_modu,
                  });
                return interaction.reply({embeds:[succEmbed]});
            } catch(err) {
                console.log(err)
                return interaction.reply({embeds:[errEmbed]});
            }
        }
        if(aktivite_modu == 'Listening'){
            try {
                interaction.client.user.setPresence({
                    activities: [{ name: yenidurum, type: ActivityType.Listening }],
                    status: durum_modu,
                  });
                return interaction.reply({embeds:[succEmbed]});
            } catch(err) {
                console.log(err)
                return interaction.reply({embeds:[errEmbed]});
            }
        }
        if(aktivite_modu =='Playing'){
            try {
                interaction.client.user.setPresence({
                    activities: [{ name: yenidurum, type: ActivityType.Playing }],
                    status: durum_modu,
                  });
                return interaction.reply({embeds:[succEmbed]});
            } catch(err) {
                console.log(err)
                return interaction.reply({embeds:[errEmbed]});
            }
        }
        if(aktivite_modu == 'Watching'){
            try {
                interaction.client.user.setPresence({
                    activities: [{ name: yenidurum, type: ActivityType.Watching }],
                    status: durum_modu,
                  });
                return interaction.reply({embeds:[succEmbed]});
            } catch(err) {
                console.log(err)
                return interaction.reply({embeds:[errEmbed]});
            }
        }


        
    }
}