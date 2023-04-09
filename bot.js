const { channel } = require('diagnostics_channel');
const {Client, MessageAttachment,MessageEmbed, GatewayIntentBits, messageLink,ActivityType} = require('discord.js');
require('dotenv/config');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates
    ]
});
let durum = "Matematik";
let aktivite = "online";

client.on('ready',() =>{
    console.log("Herşey Hazır!");
    client.user.setPresence({
        activities: [{ name: `Matematik`, type: ActivityType.Watching }],
        status: 'idle',
      });
    
});

let adminid="718497288963620904";













client.on('messageCreate',message =>{
    if(message.author.bot) return;
    if(message.content == 'ping'){
        message.reply("pong")
    }
    if(message.content.toLowerCase() == "komutları göster aga") {
        message.author.send("----------------------------------------------\nsa içeren her kelime");
        message.author.send("ping");
        message.author.send("!söyle (tekrar edilecek kelime)");
        message.author.send("!mesaj (kişinin etiket hali) (gönderilecek mesaj)");
    }
    if(message.content.toLowerCase().startsWith("!söyle ")) {
        let yazi = message.content.substring(7);
        message.reply(yazi);
    }
    if(message.content.startsWith("!mesaj ")) {
        let mesaj = message.content.substring(7);
        const startindex = mesaj.indexOf('@');
        const endindex = mesaj.indexOf('>');
        const gonderilecekid = mesaj.substring(startindex+1,endindex);
        const ham_mesaj = mesaj.substring(endindex+1);
        const kullanici = client.users.cache.get(gonderilecekid);
        kullanici.send(ham_mesaj);
    }
    if(message.content.toLowerCase() == "naber aga") {
        message.reply(`İyiyim Senden naber ${message.member.displayName}`)
    }
    
    if(message.content.toLowerCase() == 'sa'){
        message.react("🇦")
        message.react("🇸")
    }
    if(message.channelId == '1094688872866254920') {
        if(message.content ==""){
            message.react("🇦")
            message.react("🇧")
            message.react("🇨")
            message.react("🇩")
            message.react("🇪")
        }
        
    }
    if(message.content.toLowerCase().startsWith("!durum ")&&(message.author.id==adminid)){
        let yenidurum = message.content.substring(7)
        durum=yenidurum;
        client.user.setPresence({
            activities: [{ name: durum, type: ActivityType.Watching }],
            status: aktivite,
          });
        message.reply(`Durum ${durum} olarak değiştirildi.`);
        return;

    };
    if(message.content.toLowerCase().startsWith("!aktivite ")&&(message.author.id=adminid)){
        let temp = message.content.substring(10);
        if(temp == "1"){
            let yeniaktivite = "online";
            aktivite = yeniaktivite;
            client.user.setPresence({
                activities: [{ name: durum, type: ActivityType.Watching }],
                status: aktivite,
              });
            message.reply("Aktivite değişimi başarılı");
            return;
        }
        else if (temp =="2"){
            let yeniaktivite = "idle";
            aktivite=yeniaktivite;
            client.user.setPresence({
                activities: [{ name: durum, type: ActivityType.Watching }],
                status: aktivite,
              });
            message.reply("Aktivite değişimi başarılı");
            return;
        }
        else if (temp == "3"){
            let yeniaktivite = "invisible";
            aktivite=yeniaktivite;
            client.user.setPresence({
                activities: [{ name: durum, type: ActivityType.Watching }],
                status: aktivite,
              });
            message.reply("Aktivite değişimi başarılı");
            return;
        }
        else if (temp == "4"){
            let yeniaktivite = "dnd";
            aktivite= yeniaktivite;
            client.user.setPresence({
                activities: [{ name: durum, type: ActivityType.Watching }],
                status: aktivite,
              });
            message.reply("Aktivite değişimi başarılı");
            return;
        }
        else if (temp == "yardım"){
            message.reply("1-Aktif\n2-Boşta\n3-Görünmez\n4-Rahatsız etmeyin");
            return;
        }
        else {
            message.reply("Yanlış kullanım.");
            return;
        }
    }








})





























































client.login(process.env.TOKEN)