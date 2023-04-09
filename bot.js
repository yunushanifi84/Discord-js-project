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

client.on('ready',() =>{
    console.log("Herşey Hazır!");
    client.user.setPresence({
        activities: [{ name: `Matematik`, type: ActivityType.Watching }],
        status: 'idle',
      });
    
});
















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
    







})





























































client.login(process.env.TOKEN)