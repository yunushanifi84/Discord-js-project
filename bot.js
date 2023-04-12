const { channel } = require('diagnostics_channel');
const {Client, MessageAttachment,MessageEmbed, GatewayIntentBits, messageLink,ActivityType} = require('discord.js');
require('dotenv/config');
const gTTs = require('gtts');
const { joinVoiceChannel, createAudioPlayer, NoSubscriberBehavior, createAudioResource } = require('@discordjs/voice');
const { error } = require('console');
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
let mainprefix = '!';

const player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
    },
});

client.on('ready',() =>{
    console.log("Herşey Hazır!");
    client.user.setPresence({
        activities: [{ name: `Matematik`, type: ActivityType.Watching }],
        status: 'idle',
      });
    
});
const kaynak = createAudioResource('./ses/ses.mp3');
let adminid="718497288963620904";












client.on('messageCreate',message =>{
    if(message.author.bot) return;
    //genel işlemler
    if(message.channelId == '1094688872866254920') {
        if(message.content ==""){
            message.react("🇦")
            message.react("🇧")
            message.react("🇨")
            message.react("🇩")
            message.react("🇪")
        }
        
    }




    //prefixden öncesi
    
    if(message.content.toLowerCase() == "komutları göster aga") {
        message.author.send("----------------------------------------------\nsa içeren her kelime");
        message.author.send("ping");
        message.author.send("!söyle (tekrar edilecek kelime)");
        message.author.send("!mesaj (kişinin etiket hali) (gönderilecek mesaj)");
    }

    if(message.content.toLowerCase() == "naber aga") {
        message.reply(`İyiyim Senden naber ${message.member.displayName}`)
    }

    if(message.content.toLowerCase() == 'sa'){
        message.react("🇦")
        message.react("🇸")
    }




    //prefix sonrası


    if(!message.content.toLowerCase().includes("!")){
    return;
    }

    let anamesaj = message.content.substring(1);

    if(anamesaj.toLowerCase() == "katıl"){
        try {
            const Connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.member.guild.id,
                adapterCreator: message.member.guild.voiceAdapterCreator,
            });
        } catch (error) {
            message.channel.send("Herhangi bir kanalda bulunmuyorsunuz.");
        }
        
    }

    if(anamesaj.toLowerCase() == "ayrıl"){
        try {
            const Connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.member.guild.id,
                adapterCreator: message.member.guild.voiceAdapterCreator,
            });
            Connection.destroy();
        } catch (error) {
            message.channel.send("botu ayırmak için botun olduğu kanala gidin.");
        }
    }
    
    if(anamesaj.toLowerCase().startsWith("söyle ")) {
        let yazi = anamesaj.substring(6);
        message.channel.send(yazi);
    }

    if(anamesaj.toLowerCase().startsWith("mesaj ")) {
        try {
            let mesaj = anamesaj.substring(6);
            const startindex = mesaj.indexOf('@');
            const endindex = mesaj.indexOf('>');
            const gonderilecekid = mesaj.substring(startindex+1,endindex);
            const ham_mesaj = mesaj.substring(endindex+1);
            const kullanici = client.users.cache.get(gonderilecekid);
            kullanici.send(ham_mesaj);
        } catch {
            message.channel.send("Bir hatayla karşılaşıldı.");
        }
        
    }
    
    if((anamesaj.toLowerCase().startsWith("durum "))&&(message.author.id==adminid)){
        let yenidurum =anamesaj.substring(6);
        durum=yenidurum;
        client.user.setPresence({
            activities: [{ name: durum, type: ActivityType.Watching }],
            status: aktivite,
          });
        message.reply(`Durum ${durum} olarak değiştirildi.`);
        return;

    };
    
    if((anamesaj.toLowerCase().startsWith("aktivite "))&&(message.author.id=adminid)){
        let temp = anamesaj.substring(9);
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
    if(anamesaj.toLowerCase().startsWith('ses ')){
        let soylenecek = anamesaj.substring(4);
        const gtts = new gTTs(soylenecek,'tr');
        gtts.save('./ses/ses.mp3', (err) => {
            if(err) throw new Error(err)
            message.channel.send("Söyleniyor...");
        });
        const kaynak = createAudioResource('./ses/ses.mp3');
        player.play(kaynak);
        try {
            console.log(soylenecek);
            const Connection = joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.member.guild.id,
                adapterCreator: message.member.guild.voiceAdapterCreator,
            });
            Connection.subscribe(player);
        } catch(error) {}

    }

    








})





























































client.login(process.env.TOKEN)